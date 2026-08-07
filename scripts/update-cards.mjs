#!/usr/bin/env node
// Automates the card-update workflow described in README.md: find the game's
// master database, run db-convert.py against it, sanity-check the result, and
// install it as src/cards/<server>.js (downloading any new card images on JP).
import { spawn } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import { describeSearchLocations, findMasterDatabases } from "./lib/find-master-db.mjs"
import { describePythonCandidates, findPython } from "./lib/find-python.mjs"
import { findProblems, summarize } from "./lib/check-cards.mjs"
import { parseArgs, USAGE } from "./lib/parse-args.mjs"
import { choose, confirm, isInteractive } from "./lib/prompt.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const GENERATED = path.join(ROOT, "cards.js")

const SERVERS = {
  gl: { name: "global", target: path.join(ROOT, "src", "cards", "gl.js"), other: "jp", images: false },
  jp: { name: "JP", target: path.join(ROOT, "src", "cards", "jp.js"), other: "gl", images: true },
}

// Raised for expected failures, which are reported as a plain message rather
// than a stack trace.
class AbortError extends Error {}

function fail(message) {
  throw new AbortError(message)
}

// Runs a command with its output streamed to the terminal, and returns the
// combined output so warnings can be replayed at the end.
function run(command, args, { cwd = ROOT } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: ["ignore", "pipe", "pipe"] })
    let output = ""
    for (const [stream, sink] of [
      [child.stdout, process.stdout],
      [child.stderr, process.stderr],
    ]) {
      stream.setEncoding("utf8")
      stream.on("data", (chunk) => {
        output += chunk
        sink.write(chunk)
      })
    }
    child.on("error", reject)
    child.on("close", (code) => resolve({ code, output }))
  })
}

function formatCandidate({ path: file, mtimeMs, size }) {
  const megabytes = (size / 1024 / 1024).toFixed(1)
  return `${file}\n     modified ${new Date(mtimeMs).toLocaleString()}, ${megabytes} MB`
}

async function resolveDatabase(options) {
  if (options.db) {
    const file = path.resolve(options.db)
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      fail(`No file at ${file}`)
    }
    return file
  }

  console.log("Looking for the game's master database...")
  const candidates = findMasterDatabases()

  if (candidates.length === 0) {
    fail(
      "Could not find a master database. Searched:\n" +
        describeSearchLocations()
          .map((location) => `  ${location}`)
          .join("\n") +
        "\n\nPass the path yourself with --db <path to master.mdb>."
    )
  }

  if (candidates.length === 1) {
    console.log(`Found ${candidates[0].path}`)
    return candidates[0].path
  }

  if (!isInteractive()) {
    fail(
      `Found ${candidates.length} master databases:\n` +
        candidates.map((c) => `  ${c.path}`).join("\n") +
        "\n\nRe-run with --db <path> to say which one to use."
    )
  }

  const chosen = await choose("Found several master databases:", candidates, formatCandidate)
  if (!chosen) fail("No database chosen.")
  return chosen.path
}

// Card files are ES modules exporting the array as default, so importing them
// is the most reliable way to read them back.
async function loadCards(file) {
  if (!fs.existsSync(file)) return []
  const module = await import(pathToFileURL(file).href)
  return module.default
}

async function checkResult(server, options) {
  const [newCards, oldCards, otherCards] = await Promise.all([
    loadCards(GENERATED),
    loadCards(SERVERS[server].target),
    loadCards(SERVERS[SERVERS[server].other].target),
  ])

  const summary = summarize(newCards, oldCards)
  console.log(
    `\n${summary.total} cards generated (${SERVERS[server].name} currently has ${summary.previousTotal}): ` +
      `${summary.added.length} new, ${summary.removed.length} missing.`
  )

  const problems = findProblems({ server, summary, otherServerTotal: otherCards.length })
  if (problems.length === 0) return

  console.log("\nThis doesn't look like a normal update:")
  for (const problem of problems) console.log(`  - ${problem}`)

  if (options.yes) {
    console.log("\nContinuing anyway because --yes was passed.")
    return
  }
  if (!isInteractive()) {
    fail(`Stopping without changing ${path.relative(ROOT, SERVERS[server].target)}. Pass --yes to override.`)
  }
  if (!(await confirm(`\nOverwrite ${path.relative(ROOT, SERVERS[server].target)} anyway?`))) {
    fail("Stopped at your request. Nothing was changed.")
  }
}

function install(target) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  try {
    fs.renameSync(GENERATED, target)
  } catch (error) {
    // Renaming fails across filesystems, which happens when the repo and the
    // temp file live on different mounts.
    if (error.code !== "EXDEV") throw error
    fs.copyFileSync(GENERATED, target)
    fs.unlinkSync(GENERATED)
  }
  console.log(`\nWrote ${path.relative(ROOT, target)}`)
}

function reportWarnings(output) {
  const warnings = output.split(/\r?\n/).filter((line) => line.startsWith("WARN:"))
  if (warnings.length === 0) return
  console.log(`\n${"=".repeat(60)}`)
  console.log(`${warnings.length} warning(s) from db-convert.py:`)
  for (const warning of warnings) console.log(`  ${warning}`)
  console.log(
    "\nThese mean a card uses an effect db-convert.py doesn't know about.\n" +
      "Add support for it in db-convert.py - ideally by mapping it onto an\n" +
      "existing effect, so the tier list code doesn't have to change too."
  )
  console.log("=".repeat(60))
}

function reportNextSteps(server) {
  console.log("\nStill to do by hand:")
  if (server === "jp") {
    console.log("  - Optionally add the new cards' event stats to src/card-events.js")
  }
  console.log("  - Run `npm install` and `npm start` to confirm the new cards show up")
  console.log("  - Open a pull request with the updated files" + (server === "jp" ? " and images" : ""))
}

async function main() {
  let options
  try {
    options = parseArgs(process.argv.slice(2))
  } catch (error) {
    console.error(`${error.message}\n\n${USAGE}`)
    process.exitCode = 1
    return
  }

  if (options.help) {
    console.log(USAGE)
    return
  }

  const server = options.server
  const config = SERVERS[server]

  try {
    const python = findPython()
    if (!python) {
      fail(
        `Could not find Python 3. Tried: ${describePythonCandidates().join(", ")}.\n` +
          "Install it from https://www.python.org/downloads/ and make sure it's on your PATH."
      )
    }
    console.log(`Using ${[python.command, ...python.args].join(" ")}`)

    const database = await resolveDatabase(options)

    console.log(`\nConverting ${database}...`)
    const convert = await run(python.command, [...python.args, "db-convert.py", database])
    if (convert.code !== 0) fail(`db-convert.py exited with code ${convert.code}.`)
    if (!fs.existsSync(GENERATED)) fail("db-convert.py finished but produced no cards.js.")

    await checkResult(server, options)
    install(config.target)

    if (config.images && !options.skipImages) {
      console.log("\nDownloading any missing card images...")
      const images = await run(process.execPath, ["image_extract.js"])
      if (images.code !== 0) fail(`image_extract.js exited with code ${images.code}.`)
    }

    reportWarnings(convert.output)
    reportNextSteps(server)
  } catch (error) {
    // The generated file lives in the repo root, so clear it out on failure
    // rather than leaving an untracked leftover behind.
    if (fs.existsSync(GENERATED)) fs.rmSync(GENERATED, { force: true })
    console.error(`\n${error instanceof AbortError ? error.message : error.stack}`)
    process.exitCode = 1
  }
}

main()

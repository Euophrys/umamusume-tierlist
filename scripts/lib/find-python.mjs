import { spawnSync } from "node:child_process"

// The commands people actually have on PATH, in order of preference. "py -3" is
// the Windows launcher, which is often the only one that resolves.
const CANDIDATES = [
  { command: "python3", args: [] },
  { command: "python", args: [] },
  { command: "py", args: ["-3"] },
]

// db-convert.py only needs the standard library, so a Python 3 that can import
// sqlite3 is enough.
const PROBE = "import sqlite3, sys; print(sys.version_info[0])"

export function describePythonCandidates() {
  return CANDIDATES.map(({ command, args }) => [command, ...args].join(" "))
}

// Returns the first working Python 3 as {command, args}, or null if there is none.
export function findPython(candidates = CANDIDATES) {
  for (const { command, args } of candidates) {
    let result
    try {
      result = spawnSync(command, [...args, "-c", PROBE], { encoding: "utf8" })
    } catch {
      continue
    }
    if (result.error || result.status !== 0) continue
    if (result.stdout.trim() === "3") return { command, args }
  }
  return null
}

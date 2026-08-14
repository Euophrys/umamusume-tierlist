import fs from "node:fs"
import os from "node:os"
import path from "node:path"

// The game has shipped the file under both names over time, so look for either.
const DB_NAMES = ["master.mdb", "master.db"]

// The directory layout inside a Windows user profile (native or inside a Wine
// prefix). The "*" stands in for the product folder, which differs between the
// JP and global clients.
const CYGAMES_SEGMENTS = ["AppData", "LocalLow", "Cygames", "*", "master"]

function readdirSafe(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
}

function isDir(target) {
  try {
    return fs.statSync(target).isDirectory()
  } catch {
    return false
  }
}

function realpathSafe(target) {
  try {
    return fs.realpathSync(target)
  } catch {
    return target
  }
}

// Expands a list of path segments below `base`, where a segment of "*" matches
// every subdirectory. Missing directories simply yield no matches rather than
// throwing, so callers can hand over speculative paths freely.
export function expandGlob(base, segments) {
  let current = isDir(base) ? [base] : []
  for (const segment of segments) {
    const next = []
    for (const dir of current) {
      if (segment === "*") {
        for (const entry of readdirSafe(dir)) {
          if (entry.isDirectory()) next.push(path.join(dir, entry.name))
        }
      } else {
        const full = path.join(dir, segment)
        if (isDir(full)) next.push(full)
      }
    }
    current = next
  }
  return current
}

// Steam's library roots: the well-known defaults plus any extra libraries the
// user has registered in libraryfolders.vdf.
function steamRoots() {
  const home = os.homedir()
  const roots = new Set()
  const defaults = [
    path.join(home, ".steam", "steam"),
    path.join(home, ".steam", "root"),
    path.join(home, ".local", "share", "Steam"),
    path.join(home, ".var", "app", "com.valvesoftware.Steam", ".local", "share", "Steam"),
    path.join(home, "Library", "Application Support", "Steam"),
  ]
  for (const root of defaults) {
    if (isDir(root)) roots.add(realpathSafe(root))
  }
  for (const root of [...roots]) {
    for (const extra of parseLibraryFolders(path.join(root, "steamapps", "libraryfolders.vdf"))) {
      if (isDir(extra)) roots.add(realpathSafe(extra))
    }
  }
  return [...roots]
}

export function parseLibraryFolders(file) {
  let text
  try {
    text = fs.readFileSync(file, "utf8")
  } catch {
    return []
  }
  return [...text.matchAll(/"path"\s+"([^"]+)"/g)].map((match) => match[1].replace(/\\\\/g, "\\"))
}

// Every directory that could hold a master database, as {label, base, segments}
// so failures can report what was actually searched.
export function searchLocations() {
  const home = os.homedir()
  const locations = []

  if (process.platform === "win32") {
    locations.push({
      label: "Windows user profile",
      base: process.env.USERPROFILE || home,
      segments: CYGAMES_SEGMENTS,
    })
  }

  if (process.platform === "darwin") {
    locations.push({
      label: "macOS application support",
      base: path.join(home, "Library", "Application Support", "Cygames"),
      segments: ["*", "master"],
    })
  }

  for (const root of steamRoots()) {
    locations.push({
      label: `Steam Proton prefixes (${root})`,
      base: path.join(root, "steamapps", "compatdata"),
      segments: ["*", "pfx", "drive_c", "users", "*", ...CYGAMES_SEGMENTS],
    })
  }

  const winePrefixes = [path.join(home, ".wine")]
  if (process.env.WINEPREFIX) winePrefixes.push(process.env.WINEPREFIX)
  for (const prefix of winePrefixes) {
    locations.push({
      label: `Wine prefix (${prefix})`,
      base: path.join(prefix, "drive_c", "users"),
      segments: ["*", ...CYGAMES_SEGMENTS],
    })
  }

  return locations
}

export function describeSearchLocations(locations = searchLocations()) {
  return locations.map(({ base, segments }) => path.join(base, ...segments, DB_NAMES[0]))
}

// Finds every master database on this machine, newest first.
export function findMasterDatabases(locations = searchLocations()) {
  const found = new Map()
  for (const { base, segments } of locations) {
    for (const dir of expandGlob(base, segments)) {
      for (const name of DB_NAMES) {
        const file = path.join(dir, name)
        let stats
        try {
          stats = fs.statSync(file)
        } catch {
          continue
        }
        if (!stats.isFile()) continue
        const key = realpathSafe(file)
        if (!found.has(key)) found.set(key, { path: file, mtimeMs: stats.mtimeMs, size: stats.size })
      }
    }
  }
  return [...found.values()].sort((a, b) => b.mtimeMs - a.mtimeMs)
}

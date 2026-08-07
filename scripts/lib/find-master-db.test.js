import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { expandGlob, findMasterDatabases, parseLibraryFolders } from "./find-master-db.mjs"

let root

function write(relative, contents = "", mtime) {
  const file = path.join(root, relative)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, contents)
  if (mtime) fs.utimesSync(file, mtime, mtime)
  return file
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "find-master-db-"))
})

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

describe("expandGlob", () => {
  it("expands a wildcard to every subdirectory", () => {
    write("prefixes/a/master/master.mdb")
    write("prefixes/b/master/master.mdb")
    expect(expandGlob(path.join(root, "prefixes"), ["*", "master"]).sort()).toEqual([
      path.join(root, "prefixes", "a", "master"),
      path.join(root, "prefixes", "b", "master"),
    ])
  })

  it("ignores files where a directory is expected", () => {
    write("prefixes/a/master/master.mdb")
    write("prefixes/loose-file.txt")
    expect(expandGlob(path.join(root, "prefixes"), ["*", "master"])).toEqual([
      path.join(root, "prefixes", "a", "master"),
    ])
  })

  it("returns nothing for a base that does not exist", () => {
    expect(expandGlob(path.join(root, "nope"), ["*"])).toEqual([])
  })

  it("returns nothing when the path bottoms out early", () => {
    write("prefixes/a/other/file.txt")
    expect(expandGlob(path.join(root, "prefixes"), ["*", "master"])).toEqual([])
  })
})

describe("parseLibraryFolders", () => {
  it("pulls every path out of the vdf", () => {
    const file = write(
      "libraryfolders.vdf",
      `"libraryfolders"\n{\n\t"0"\n\t{\n\t\t"path"\t\t"/home/me/.local/share/Steam"\n\t}\n\t"1"\n\t{\n\t\t"path"\t\t"/mnt/games/SteamLibrary"\n\t}\n}\n`
    )
    expect(parseLibraryFolders(file)).toEqual(["/home/me/.local/share/Steam", "/mnt/games/SteamLibrary"])
  })

  it("unescapes Windows separators", () => {
    const file = write("windows.vdf", `"path"\t\t"D:\\\\SteamLibrary"`)
    expect(parseLibraryFolders(file)).toEqual(["D:\\SteamLibrary"])
  })

  it("returns nothing when the file is missing", () => {
    expect(parseLibraryFolders(path.join(root, "missing.vdf"))).toEqual([])
  })
})

describe("findMasterDatabases", () => {
  const locationsFor = (base) => [{ label: "test", base: path.join(root, base), segments: ["*", "master"] }]

  it("finds both spellings of the database name", () => {
    write("games/new/master/master.mdb")
    write("games/old/master/master.db")
    expect(findMasterDatabases(locationsFor("games")).map((c) => path.basename(c.path)).sort()).toEqual([
      "master.db",
      "master.mdb",
    ])
  })

  it("sorts newest first", () => {
    write("games/old/master/master.mdb", "old", new Date("2024-01-01"))
    write("games/new/master/master.mdb", "new", new Date("2026-01-01"))
    expect(findMasterDatabases(locationsFor("games")).map((c) => c.path)).toEqual([
      path.join(root, "games", "new", "master", "master.mdb"),
      path.join(root, "games", "old", "master", "master.mdb"),
    ])
  })

  it("reports each database once even when two locations overlap", () => {
    write("games/a/master/master.mdb")
    const locations = [...locationsFor("games"), ...locationsFor("games")]
    expect(findMasterDatabases(locations)).toHaveLength(1)
  })

  it("ignores unrelated files", () => {
    write("games/a/master/meta.mdb")
    expect(findMasterDatabases(locationsFor("games"))).toEqual([])
  })

  it("returns nothing when no location exists", () => {
    expect(findMasterDatabases(locationsFor("nowhere"))).toEqual([])
  })
})

import { describe, expect, it } from "vitest"

import { parseArgs } from "./parse-args.mjs"

describe("parseArgs", () => {
  it("reads the server", () => {
    expect(parseArgs(["jp"]).server).toBe("jp")
    expect(parseArgs(["gl"]).server).toBe("gl")
  })

  it("defaults the flags to off", () => {
    expect(parseArgs(["gl"])).toEqual({ server: "gl", db: null, yes: false, skipImages: false, help: false })
  })

  it("reads flags in either order", () => {
    expect(parseArgs(["--yes", "jp", "--skip-images"])).toMatchObject({
      server: "jp",
      yes: true,
      skipImages: true,
    })
    expect(parseArgs(["-y", "gl"]).yes).toBe(true)
  })

  it("accepts --db in both spellings", () => {
    expect(parseArgs(["jp", "--db", "/tmp/master.mdb"]).db).toBe("/tmp/master.mdb")
    expect(parseArgs(["jp", "--db=/tmp/master.mdb"]).db).toBe("/tmp/master.mdb")
  })

  it("allows --help without a server", () => {
    expect(parseArgs(["--help"]).help).toBe(true)
    expect(parseArgs(["-h"]).help).toBe(true)
  })

  it("rejects a missing or unknown server", () => {
    expect(() => parseArgs([])).toThrow(/got nothing/)
    expect(() => parseArgs(["global"])).toThrow(/got "global"/)
  })

  it("rejects unknown options, extra arguments and a bare --db", () => {
    expect(() => parseArgs(["jp", "--nope"])).toThrow(/Unknown option/)
    expect(() => parseArgs(["jp", "gl"])).toThrow(/Unexpected argument/)
    expect(() => parseArgs(["jp", "--db"])).toThrow(/needs a path/)
  })
})

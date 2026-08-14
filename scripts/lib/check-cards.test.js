import { describe, expect, it } from "vitest"

import { findProblems, summarize } from "./check-cards.mjs"

const cards = (...ids) => ids.map((id) => ({ id }))

describe("summarize", () => {
  it("counts added and removed cards", () => {
    expect(summarize(cards(1, 2, 3), cards(1, 2))).toEqual({
      total: 3,
      previousTotal: 2,
      added: [3],
      removed: [],
    })
  })

  it("reports cards that disappeared", () => {
    expect(summarize(cards(1, 4), cards(1, 2, 3))).toMatchObject({ added: [4], removed: [2, 3] })
  })

  it("handles a missing current file", () => {
    expect(summarize(cards(1, 2), [])).toMatchObject({ total: 2, previousTotal: 0, added: [1, 2], removed: [] })
  })
})

describe("findProblems", () => {
  const summaryFor = (newIds, oldIds) => summarize(cards(...newIds), cards(...oldIds))

  it("is happy with a normal update", () => {
    const summary = summaryFor([1, 2, 3], [1, 2])
    expect(findProblems({ server: "jp", summary, otherServerTotal: 2 })).toEqual([])
    expect(findProblems({ server: "gl", summary, otherServerTotal: 400 })).toEqual([])
  })

  it("complains about an empty result", () => {
    const summary = summaryFor([], [])
    expect(findProblems({ server: "jp", summary, otherServerTotal: 0 })).toEqual([
      expect.stringContaining("empty"),
    ])
  })

  it("complains when cards disappear", () => {
    const summary = summaryFor([1], [1, 2, 3])
    expect(findProblems({ server: "jp", summary, otherServerTotal: 0 })).toEqual([
      expect.stringContaining("missing from the new one"),
    ])
  })

  it("flags a global list that has caught up to JP", () => {
    const summary = summaryFor([1, 2, 3, 4], [1, 2, 3])
    expect(findProblems({ server: "gl", summary, otherServerTotal: 4 })).toEqual([
      expect.stringContaining("JP master database"),
    ])
  })

  it("does not apply the JP comparison to the JP list itself", () => {
    const summary = summaryFor([1, 2, 3, 4], [1, 2, 3])
    expect(findProblems({ server: "jp", summary, otherServerTotal: 2 })).toEqual([])
  })

  it("skips the JP comparison when the JP list is unavailable", () => {
    const summary = summaryFor([1, 2], [1])
    expect(findProblems({ server: "gl", summary, otherServerTotal: 0 })).toEqual([])
  })
})

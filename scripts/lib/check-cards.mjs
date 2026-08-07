// Compares a freshly generated card list against the one currently checked in.
export function summarize(newCards, oldCards) {
  const newIds = new Set(newCards.map((card) => card.id))
  const oldIds = new Set(oldCards.map((card) => card.id))
  return {
    total: newCards.length,
    previousTotal: oldCards.length,
    added: [...newIds].filter((id) => !oldIds.has(id)),
    removed: [...oldIds].filter((id) => !newIds.has(id)),
  }
}

// Reasons to stop and ask before overwriting the checked-in file. An empty list
// means the result looks like a normal update.
export function findProblems({ server, summary, otherServerTotal }) {
  const problems = []

  if (summary.total === 0) {
    problems.push("The generated card list is empty - db-convert.py found no cards in this database.")
  }

  if (summary.removed.length > 0) {
    const sample = summary.removed.slice(0, 5).join(", ")
    const more = summary.removed.length > 5 ? ", ..." : ""
    problems.push(
      `${summary.removed.length} card(s) in the current file are missing from the new one (${sample}${more}). ` +
        "Card lists normally only grow, so this may be the wrong server's database."
    )
  }

  // Global always trails JP, so a global list that has caught up is the clearest
  // available sign that a JP database was picked by mistake.
  if (server === "gl" && otherServerTotal > 0 && summary.total >= otherServerTotal) {
    problems.push(
      `This produced ${summary.total} cards, but the JP list only has ${otherServerTotal}. ` +
        "Global is always behind JP, so this looks like a JP master database."
    )
  }

  return problems
}

import readline from "node:readline/promises"

export function isInteractive() {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY)
}

async function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  try {
    return (await rl.question(question)).trim()
  } finally {
    rl.close()
  }
}

// Asks the user to pick one of `items`, which are rendered by `describe`.
// Returns the chosen item, or null if the user backs out.
export async function choose(title, items, describe) {
  console.log(`\n${title}`)
  items.forEach((item, index) => {
    console.log(`  ${index + 1}) ${describe(item)}`)
  })
  while (true) {
    const answer = await ask(`Choose 1-${items.length} (or q to quit): `)
    if (answer.toLowerCase() === "q" || answer === "") return null
    const index = Number(answer)
    if (Number.isInteger(index) && index >= 1 && index <= items.length) return items[index - 1]
    console.log("Not a valid choice.")
  }
}

export async function confirm(question) {
  const answer = await ask(`${question} [y/N] `)
  return answer.toLowerCase() === "y" || answer.toLowerCase() === "yes"
}

export const SERVER_KEYS = ["gl", "jp"]

export const USAGE = `Usage: node scripts/update-cards.mjs <gl|jp> [options]

  --db <path>     Path to master.mdb; skips the automatic search
  --yes, -y       Don't ask for confirmation when the result looks unusual
  --skip-images   (JP only) Don't run image_extract.js afterwards
  --help, -h      Show this message
`

export function parseArgs(argv) {
  const options = { server: null, db: null, yes: false, skipImages: false, help: false }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--help" || arg === "-h") {
      options.help = true
    } else if (arg === "--yes" || arg === "-y") {
      options.yes = true
    } else if (arg === "--skip-images") {
      options.skipImages = true
    } else if (arg === "--db") {
      options.db = argv[++i]
      if (!options.db) throw new Error("--db needs a path")
    } else if (arg.startsWith("--db=")) {
      options.db = arg.slice("--db=".length)
      if (!options.db) throw new Error("--db needs a path")
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`)
    } else if (options.server === null) {
      options.server = arg
    } else {
      throw new Error(`Unexpected argument: ${arg}`)
    }
  }

  if (!options.help && !SERVER_KEYS.includes(options.server)) {
    const got = options.server === null ? "nothing" : `"${options.server}"`
    throw new Error(`Expected a server of "gl" or "jp", got ${got}`)
  }

  return options
}

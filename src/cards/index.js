// Card data for each server lives in a very large generated module (jp.js is
// ~2MB, gl.js ~1MB). Only one server is active at a time, so they are pulled
// in with dynamic import() and Vite emits them as separate chunks that are
// fetched on demand instead of shipping both in the main bundle.

const LOADERS = {
  jp: () => import("./jp"),
  gl: () => import("./gl"),
}

export const DEFAULT_SERVER = "jp"

const EMPTY = []
const loaded = {}
const inFlight = {}

function normalizeServer(server) {
  return LOADERS[server] ? server : DEFAULT_SERVER
}

// Resolves with the card list for a server, fetching the chunk on first use
// and reusing it (and any in-flight request) afterwards.
export function loadCards(server) {
  const key = normalizeServer(server)
  if (loaded[key]) return Promise.resolve(loaded[key])
  if (!inFlight[key]) {
    inFlight[key] = LOADERS[key]().then(
      (mod) => {
        loaded[key] = mod.default
        delete inFlight[key]
        return loaded[key]
      },
      (err) => {
        delete inFlight[key]
        throw err
      }
    )
  }
  return inFlight[key]
}

// Synchronous accessor for code that can't await: returns the cards if the
// chunk has already been loaded, otherwise an empty list.
export function getCards(server) {
  return loaded[normalizeServer(server)] || EMPTY
}

export function areCardsLoaded(server) {
  return Boolean(loaded[normalizeServer(server)])
}

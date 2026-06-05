import React from "react"
import { FALLBACK_LOCALE_ID, getLocale } from "./locales"
import { getCards } from "../cards"
import { getServerConfig } from "../scenarios"

// React context exposing the active server identifier ("jp" or "gl"), the
// active locale identifier and resolved strings bundle, the loaded card data
// for that server, and the server-specific config object. Server and locale
// are intentionally independent so players can mix them (e.g. browse the
// Global tier list using JP terminology).

const defaultServer = "jp"
const defaultLocaleKey = FALLBACK_LOCALE_ID
const defaultValue = {
  server: defaultServer,
  localeKey: defaultLocaleKey,
  t: getLocale(defaultLocaleKey),
  cards: getCards(defaultServer),
  serverConfig: getServerConfig(defaultServer),
}

export const AppContext = React.createContext(defaultValue)

export function useApp() {
  return React.useContext(AppContext)
}

export function useLocale() {
  return React.useContext(AppContext).t
}

export function buildContextValue(server, localeKey) {
  return {
    server,
    localeKey,
    t: getLocale(localeKey),
    cards: getCards(server),
    serverConfig: getServerConfig(server),
  }
}

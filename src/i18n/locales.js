// Locale registry.
//
// Each locale lives in its own file under ./locales/ and is registered
// below. See ./locales/README.md for the full contributor guide.
//
// A locale module default-exports an object of the form:
//
//   {
//       id: "en-jp",            // unique identifier
//       label: "English (JP terms)",
//       language: "English",    // human-readable language name
//       terminology: "jp",      // "jp" or "gl" — which server vocab is used
//       extends: null,          // id of parent locale to inherit from
//       strings: { ... },       // partial or full string bundle
//   }
//
// Resolved string bundles are computed lazily by walking the `extends`
// chain and deep-merging child overrides on top of inherited values.

import enJp from "./locales/en-jp"
import enGl from "./locales/en-gl"

// Order here controls the order shown in the locale picker.
const REGISTERED_LOCALES = [enJp, enGl]

// The locale used when nothing else is available (and the implicit root
// for any locale whose `extends` chain doesn't terminate at a registered
// parent).
const FALLBACK_LOCALE_ID = "en-jp"

// Locale ids that older builds saved to localStorage. Map them onto the
// current ids so returning users keep their preference.
const LEGACY_ID_ALIASES = {
    jp: "en-jp",
    gl: "en-gl",
}

const LOCALE_MODULES = Object.fromEntries(
    REGISTERED_LOCALES.map((mod) => [mod.id, mod])
)

function isPlainObject(value) {
    return (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        typeof value !== "function"
    )
}

// Deep-merge `override` on top of `base`. Functions and arrays in
// `override` replace their counterparts wholesale; nested plain objects
// are merged key by key.
function deepMerge(base, override) {
    if (!isPlainObject(base)) return override
    if (!isPlainObject(override)) return override
    const out = { ...base }
    for (const key of Object.keys(override)) {
        out[key] = deepMerge(base[key], override[key])
    }
    return out
}

// Walk a locale's `extends` chain to produce the fully-resolved string
// bundle. Cycles or missing parents fall back to an empty object so the
// app keeps rendering even with a malformed contribution.
const resolvedCache = new Map()

function resolveStrings(id, seen = new Set()) {
    if (resolvedCache.has(id)) return resolvedCache.get(id)
    if (seen.has(id)) return {}
    const mod = LOCALE_MODULES[id]
    if (!mod) return {}
    seen.add(id)
    const parentStrings = mod.extends
        ? resolveStrings(mod.extends, seen)
        : {}
    const merged = deepMerge(parentStrings, mod.strings || {})
    resolvedCache.set(id, merged)
    return merged
}

// Map of resolved locales keyed by id. Each entry is the merged strings
// bundle, so components can read `t.someKey` directly.
export const LOCALES = Object.fromEntries(
    REGISTERED_LOCALES.map((mod) => [mod.id, resolveStrings(mod.id)])
)

// Option list for <select>-style locale pickers.
export const LOCALE_OPTIONS = REGISTERED_LOCALES.map((mod) => ({
    value: mod.id,
    label: mod.label,
}))

// Normalize a raw locale identifier (possibly a legacy alias or unknown
// string) to a registered locale id, falling back to FALLBACK_LOCALE_ID.
export function normalizeLocaleKey(key) {
    if (key && LOCALE_MODULES[key]) return key
    if (key && LEGACY_ID_ALIASES[key]) return LEGACY_ID_ALIASES[key]
    return FALLBACK_LOCALE_ID
}

export function isKnownLocaleKey(key) {
    return Boolean(key && (LOCALE_MODULES[key] || LEGACY_ID_ALIASES[key]))
}

export function getLocale(key) {
    return LOCALES[normalizeLocaleKey(key)]
}

// Helper that returns the 7-slot type_names array used throughout the app
// ([Speed, Stamina, Power, Guts, Wisdom, "", Friend/Pal]).
export function getTypeNames(locale) {
    return [
        locale.speed,
        locale.stamina,
        locale.power,
        locale.guts,
        locale.wisdom,
        "",
        locale.friend,
    ]
}

export { FALLBACK_LOCALE_ID }

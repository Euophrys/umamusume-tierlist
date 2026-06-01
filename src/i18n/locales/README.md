# Locales

This folder holds one file per locale. Each locale is a JavaScript module
that default-exports an object describing the locale and the strings it
provides.

## Adding a new locale

1. Create a new file named after your locale id, e.g. `fr-jp.js` for French
   using JP server terminology, or `ja-jp.js` for native Japanese.

   The convention is `<language>-<terminology>` where:
   - `language` is the lowercase ISO 639-1 code of the UI language
     (`en`, `fr`, `ja`, `zh`, ...).
   - `terminology` indicates which server's in-game vocabulary the
     translation mirrors (`jp` or `gl`), in case fan translations
     differ from official ones, as in English.

2. Copy `en-jp.js` as a starting point. Set the metadata at the top:

   ```js
   const locale = {
       id: "fr-jp",
       label: "Français (termes JP)",
       extends: "en-jp", // any registered locale, or null for a root locale
       strings: {
           // Only the keys you want to override. Anything you omit is
           // resolved from the locale named in `extends` (recursively),
           // eventually falling back to `en-jp`.
       },
   }

   export default locale
   ```

3. Register the locale by importing it in `../locales.js` and adding it to
   the `REGISTERED_LOCALES` array. Order in that array controls the order
   shown in the language picker.

That's it — no other changes are required. The app resolves the full
string bundle for a locale at runtime by walking the `extends` chain and
deep-merging overrides on top of inherited values.

## String shape

Every key in `en-jp.js`'s `strings` object documents the shape expected
by the UI. Values may be plain strings, nested objects, or functions that
build a string from arguments (e.g. `rankingFor(ordinal, type)`).

Keep functions pure — they're called during render.

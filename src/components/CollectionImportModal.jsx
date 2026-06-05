import React from "react"
import { AppContext } from "../i18n/context"
import gametoraConversion from "./gametora_conversion.json"

// Maps the app's server identifier to the Gametora export server key.
const DEFAULT_SOURCE_BY_SERVER = {
  jp: "ja",
  gl: "en",
}

class CollectionImportModal extends React.Component {
  static contextType = AppContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      text: "",
      source: DEFAULT_SOURCE_BY_SERVER[context.server] || "ja",
      error: null,
    }

    this.onTextChanged = this.onTextChanged.bind(this)
    this.onSourceChanged = this.onSourceChanged.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onBackdropClick = this.onBackdropClick.bind(this)
  }

  onTextChanged(event) {
    this.setState({ text: event.target.value, error: null })
  }

  onSourceChanged(event) {
    this.setState({ source: event.target.value })
  }

  onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      this.props.onCancel()
    }
  }

  onSubmit() {
    const { t } = this.context
    const { text, source } = this.state

    if (!text.trim()) {
      this.setState({ error: t.importErrorEmpty })
      return
    }

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch (e) {
      this.setState({ error: t.importErrorInvalidJson })
      return
    }

    const supports =
      parsed && parsed.servers && parsed.servers[source]
        ? parsed.servers[source].supports
        : null

    if (!supports || typeof supports !== "object") {
      this.setState({ error: t.importErrorNoSupports })
      return
    }

    // Convert Gametora's compact base62-ish keys into the numeric card IDs the
    // app uses internally. Unknown keys are silently skipped.
    const ids = {}
    let count = 0
    for (const key of Object.keys(supports)) {
      const numericId = gametoraConversion[key]
      if (numericId === undefined) continue
      ids[numericId] = supports[key]
      count++
    }

    this.props.onImport({ ids, source, count })
  }

  render() {
    const { t } = this.context
    const { text, source, error } = this.state

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={this.onBackdropClick}
      >
        <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-xl p-5">
          <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100 mb-1">
            {t.importCollection}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-3">
            {t.importCollectionHelp}
          </p>

          <fieldset className="mb-3">
            <legend className="text-xs font-semibold text-slate-600 dark:text-zinc-300 mb-1">
              {t.importCollectionSource}
            </legend>
            <div className="flex gap-4 text-sm text-slate-700 dark:text-zinc-200">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="collection-source"
                  value="ja"
                  checked={source === "ja"}
                  onChange={this.onSourceChanged}
                  className="cursor-pointer"
                />
                {t.importCollectionSourceJp}
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="collection-source"
                  value="en"
                  checked={source === "en"}
                  onChange={this.onSourceChanged}
                  className="cursor-pointer"
                />
                {t.importCollectionSourceGl}
              </label>
            </div>
          </fieldset>

          <textarea
            value={text}
            onChange={this.onTextChanged}
            placeholder={t.importCollectionPlaceholder}
            rows={8}
            className="w-full font-mono text-xs px-2 py-2 border border-slate-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={this.props.onCancel}
              className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              {t.cancel}
            </button>
            <button
              type="button"
              onClick={this.onSubmit}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {t.importButton}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CollectionImportModal

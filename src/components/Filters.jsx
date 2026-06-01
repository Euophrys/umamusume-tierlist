import React from "react"
import { AppContext } from "../i18n/context"
import { lsTest } from "../utils"
import CollectionImportModal from "./CollectionImportModal"

class Filters extends React.Component {
  static contextType = AppContext

  constructor(props, context) {
    super(props, context)

    // Default filter selection comes from the active server's config so the
    // initial card visibility matches what each server prefers.
    this.state = {
      ...context.serverConfig.defaultFilters,
      importOpen: false,
    }

    this.onSettingChanged = this.onSettingChanged.bind(this)
    this.onOpenImport = this.onOpenImport.bind(this)
    this.onCloseImport = this.onCloseImport.bind(this)
    this.onCollectionImported = this.onCollectionImported.bind(this)
    this.onDiscardCollection = this.onDiscardCollection.bind(this)

    if (lsTest()) {
      // Filters are persisted per-server so toggling between servers doesn't
      // bleed selections that don't make sense on the other game version.
      let savedFilters = window.localStorage.getItem(
        "filters." + context.server
      )
      if (savedFilters !== null) {
        savedFilters = JSON.parse(savedFilters)
        this.state = { ...savedFilters, importOpen: false }
      }
    }

    this.props.onCardsChanged(
      this.filterCards(this.state, context.cards, this.props.collection)
    )
  }

  // Filters the full card pool. When a collection has been imported, only the
  // owned cards (with matching limit_break) are shown and rarity toggles are
  // bypassed. Otherwise the standard rarity/limit-break grid applies.
  filterCards(state, cards, collection) {
    if (collection && collection.ids) {
      return cards.filter((c) => collection.ids[c.id] === c.limit_break)
    }
    return cards.filter((c) => {
      if (c.rarity === 1) {
        return state.r[c.limit_break]
      } else if (c.rarity === 2) {
        return state.sr[c.limit_break]
      } else {
        return state.ssr[c.limit_break]
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // Persist the rarity filter selections per server. Ignore the transient
    // `importOpen` toggle.
    if (prevState && prevState !== this.state && lsTest()) {
      const { importOpen: _io, ...persistable } = this.state
      window.localStorage.setItem(
        "filters." + this.context.server,
        JSON.stringify(persistable)
      )
    }

    // Re-emit the filtered card list whenever the collection changes so the
    // tier list reflects the new restriction (or its removal).
    if (prevProps.collection !== this.props.collection) {
      this.props.onCardsChanged(
        this.filterCards(this.state, this.context.cards, this.props.collection)
      )
    }
  }

  onSettingChanged(event) {
    if (!event) return

    let settings = { ...this.state }

    if (event.target.id.indexOf(".") > 0) {
      let split = event.target.id.split(".")
      settings[split[0]] = settings[split[0]].slice()
      settings[split[0]][split[1]] = !settings[split[0]][split[1]]
    } else {
      settings[event.target.id] = !settings[event.target.id]
    }

    this.setState(settings)

    this.props.onCardsChanged(
      this.filterCards(settings, this.context.cards, this.props.collection)
    )
  }

  onOpenImport() {
    this.setState({ importOpen: true })
  }

  onCloseImport() {
    this.setState({ importOpen: false })
  }

  onCollectionImported(collection) {
    this.setState({ importOpen: false })
    this.props.onCollectionLoaded(collection)
  }

  onDiscardCollection() {
    this.props.onCollectionCleared()
  }

  renderRarityTable() {
    const rarities = ["ssr", "sr", "r"]
    let rows = []
    rows.push(
      <tr
        key="header"
        className="border-b border-slate-200 dark:border-zinc-800"
      >
        <th className="px-2 py-3 text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider text-center">
          SSR
        </th>
        <th className="px-2 py-3 text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider text-center">
          SR
        </th>
        <th className="px-2 py-3 text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider text-center">
          R
        </th>
      </tr>
    )
    for (let i = 4; i >= 0; i--) {
      let data = []
      let lit_up = ""
      let dark = ""
      for (let j = 0; j < 4; j++) {
        if (j < i) {
          lit_up += "◆"
        } else {
          dark += "◆"
        }
      }
      for (let r = 0; r < 3; r++) {
        data.push(
          <td
            key={"r" + r}
            className="px-2 py-2 whitespace-nowrap align-middle"
          >
            <div className="inline-flex items-center justify-center space-x-1.5">
              <span className="font-mono text-xs tracking-tight">
                <span className="text-cyan-500 font-bold dark:text-cyan-400">
                  {lit_up}
                </span>
                <span className="text-slate-300 dark:text-zinc-700">
                  {dark}
                </span>
              </span>
              <input
                type="checkbox"
                checked={this.state[rarities[r]][i]}
                id={rarities[r] + "." + i}
                onChange={this.onSettingChanged}
                className="h-4 w-4 text-blue-600 border-slate-300 dark:border-zinc-700 rounded focus:ring-blue-500 dark:bg-zinc-950 cursor-pointer"
              />
            </div>
          </td>
        )
      }
      rows.push(
        <tr
          key={"c" + i}
          className="hover:bg-slate-50 dark:hover:bg-zinc-850/50 "
        >
          {data}
        </tr>
      )
    }

    return (
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-center divide-y divide-slate-100 dark:divide-zinc-800">
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  }

  renderCollectionBanner() {
    const { t, cards } = this.context
    const collection = this.props.collection
    const total = collection.count
    const shown = cards.filter(
      (c) => collection.ids[c.id] === c.limit_break
    ).length

    return (
      <div className="rounded-md border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/30 p-3">
        <p className="text-xs font-semibold text-blue-800 dark:text-blue-200">
          {t.collectionLoaded(total)}
        </p>
        {shown !== total && (
          <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
            {t.collectionLoadedFiltered(shown, total)}
          </p>
        )}
        <button
          type="button"
          onClick={this.onDiscardCollection}
          className="mt-2 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-100 bg-white dark:bg-zinc-900 border border-blue-300 dark:border-blue-800 rounded-md hover:bg-blue-100 dark:hover:bg-zinc-800"
        >
          {t.discardCollection}
        </button>
      </div>
    )
  }

  render() {
    const { t } = this.context
    const hasCollection = !!this.props.collection

    return (
      <div className="filters font-sans">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-zinc-800 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            {t.cardFilters}
          </h3>
          {!hasCollection && (
            <span className="text-xs text-slate-400 dark:text-zinc-500">
              {t.rarityLimitBreak}
            </span>
          )}
        </div>

        {hasCollection
          ? this.renderCollectionBanner()
          : this.renderRarityTable()}

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={this.onOpenImport}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            {t.importCollection}
          </button>
        </div>

        {this.state.importOpen && (
          <CollectionImportModal
            onCancel={this.onCloseImport}
            onImport={this.onCollectionImported}
          />
        )}
      </div>
    )
  }
}

export default Filters

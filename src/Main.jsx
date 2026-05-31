import "./Main.css"
import TierList from "./components/TierList"
import Weights from "./components/Weights"
import SelectedCards from "./components/SelectedCards"
import Filters from "./components/Filters"
import React from "react"
import DarkModeToggle from "./components/DarkModeButton"
import {
    AppContext,
    buildContextValue,
} from "./i18n/context"
import { LOCALE_OPTIONS } from "./i18n/locales"
import { getCards } from "./cards"
import { getServerConfig } from "./scenarios"
import { lsTest } from "./utils"

const SERVER_OPTIONS = [
    { value: "jp", label: "JP" },
    { value: "gl", label: "Global" },
]

// Initial server selection priority: legacy hash route (#/global) for
// backward-compatible bookmarks, then localStorage, then "jp" default.
function detectInitialServer() {
    if (typeof window !== "undefined" && window.location && window.location.hash) {
        if (window.location.hash.toLowerCase().includes("global")) {
            return "gl"
        }
    }
    if (lsTest()) {
        const saved = window.localStorage.getItem("server")
        if (saved === "jp" || saved === "gl") return saved
    }
    return "jp"
}

function detectInitialLocale(server) {
    if (lsTest()) {
        const saved = window.localStorage.getItem("locale")
        if (saved === "jp" || saved === "gl") return saved
    }
    return getServerConfig(server).defaultLocale
}

class Main extends React.Component {
    constructor(props) {
        super(props)

        const server = detectInitialServer()
        const localeKey = detectInitialLocale(server)
        const cards = getCards(server)
        const serverConfig = getServerConfig(server)

        this.state = {
            server,
            localeKey,
            // Weights, selected cards, and available cards all derive from the
            // active server. They are rebuilt whenever the server changes.
            weights: this.makeInitialWeights(),
            selectedCards: this.makeInitialSelectedCards(cards, serverConfig),
            availableCards: cards,
        }

        this.onWeightsChanged = this.onWeightsChanged.bind(this)
        this.onCardSelected = this.onCardSelected.bind(this)
        this.onCardRemoved = this.onCardRemoved.bind(this)
        this.onCardsChanged = this.onCardsChanged.bind(this)
        this.onLoadPreset = this.onLoadPreset.bind(this)
        this.onServerChanged = this.onServerChanged.bind(this)
        this.onLocaleChanged = this.onLocaleChanged.bind(this)
    }

    makeInitialWeights() {
        // Sensible defaults; Weights will call back with the real scenario state
        // on mount, which overrides these.
        return {
            type: 0,
            bondPerDay: 3.5,
            trainingDays: 50,
            races: [10, 10, 5, 3],
            unbondedTrainingGain: [
                [8, 0, 4, 0, 0, 2, 19],
                [0, 7, 0, 3, 0, 2, 17],
                [0, 4, 6, 0, 0, 2, 18],
                [3, 0, 3, 6, 0, 2, 20],
                [2, 0, 0, 0, 6, 3, 0],
            ],
            bondedTrainingGain: [
                [10, 0, 4, 0, 0, 2, 21],
                [0, 8, 0, 3, 0, 2, 18],
                [0, 4, 7, 0, 0, 2, 19],
                [4, 0, 3, 9, 0, 2, 24],
                [3, 0, 0, 0, 9, 3, 0],
            ],
            summerTrainingGain: [
                [11, 0, 5, 0, 0, 2, 22],
                [0, 9, 0, 6, 0, 2, 21],
                [0, 4, 10, 0, 0, 2, 21],
                [3, 0, 2, 10, 0, 2, 24],
                [3, 0, 0, 0, 9, 3, 0],
            ],
            umaBonus: [1, 1, 1, 1, 1, 1],
            stats: [1, 1, 1.1, 1, 1, 0.5, 1.5],
            multi: 1,
            bonusFS: 0,
            bonusSpec: 0,
            motivation: 0.2,
            scenarioLink: [],
            scenarioBonus: 0,
            fanBonus: 0.05,
            prioritize: true,
            onlySummer: false,
        }
    }

    makeInitialSelectedCards(cards, serverConfig) {
        // Pull each preset card at max limit break; fall back to anything that
        // matches the id if a max-LB entry doesn't exist for that server.
        return serverConfig.defaultPresetCards
            .map(
                (id) =>
                    cards.find((c) => c.id === id && c.limit_break === 4) ||
                    cards.find((c) => c.id === id)
            )
            .filter(Boolean)
    }

    onWeightsChanged(statWeights, generalWeights) {
        let combinedWeights = { ...statWeights, ...generalWeights }
        this.setState({ weights: combinedWeights })
    }

    onCardSelected(card) {
        if (this.state.selectedCards.length > 5) return
        let cards = this.state.selectedCards.slice()
        let index = this.state.selectedCards.findIndex((c) => c.id === card.id)

        if (index > -1) {
            cards[index] = card
        } else {
            cards.push(card)
        }

        this.setState({ selectedCards: cards })
    }

    onCardRemoved(card) {
        if (this.state.selectedCards.length === 1) return
        let cards = this.state.selectedCards.slice()
        let cardIndex = cards.findIndex((c) => c.id === card.id)
        cards.splice(cardIndex, 1)
        this.setState({ selectedCards: cards })
    }

    onCardsChanged(cards) {
        this.setState({ availableCards: cards })
    }

    onLoadPreset(presetCards) {
        const cards = getCards(this.state.server)
        let selectedCards = []
        for (let i = 0; i < presetCards.length; i++) {
            const found =
                cards.find((c) => c.id === presetCards[i] && c.limit_break === 4) ||
                cards.find((c) => c.id === presetCards[i])
            if (found) selectedCards.push(found)
        }
        if (selectedCards.length > 0) this.setState({ selectedCards })
    }

    onServerChanged(event) {
        const server = event.target.value
        if (server === this.state.server) return
        const cards = getCards(server)
        const serverConfig = getServerConfig(server)
        if (lsTest()) {
            window.localStorage.setItem("server", server)
        }
        this.setState({
            server,
            availableCards: cards,
            selectedCards: this.makeInitialSelectedCards(cards, serverConfig),
        })
    }

    onLocaleChanged(event) {
        const localeKey = event.target.value
        if (lsTest()) {
            window.localStorage.setItem("locale", localeKey)
        }
        this.setState({ localeKey })
    }

    render() {
        const { server, localeKey } = this.state
        const ctxValue = buildContextValue(server, localeKey)
        const { t, serverConfig } = ctxValue

        return (
            <AppContext.Provider value={ctxValue}>
                <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans pb-12">
                    <DarkModeToggle />

                    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 border-b border-slate-200 dark:border-zinc-800">
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="flex-1 min-w-0 pl-5">
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                    {t.appTitle}
                                    <span className="ml-3 align-middle text-xs font-bold uppercase tracking-widest px-2 py-1 rounded bg-blue-600 text-white">
                                        {t.serverShort[server]}
                                    </span>
                                </h1>
                                <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
                                    Defaults to the{" "}
                                    <span className="font-semibold">
                                        {t.scenarioLabels[serverConfig.defaultScenario] ||
                                            serverConfig.defaultScenario}
                                    </span>{" "}
                                    scenario and doesn't consider skills, only stats.
                                </p>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3 md:mt-0 md:ml-4">
                                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-zinc-300">
                                    {t.serverLabel}
                                    <select
                                        value={server}
                                        onChange={this.onServerChanged}
                                        className="px-2 py-1.5 border border-slate-300 dark:border-zinc-700 rounded-md text-sm font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 cursor-pointer"
                                    >
                                        {SERVER_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-zinc-300">
                                    {t.localeLabel}
                                    <select
                                        value={localeKey}
                                        onChange={this.onLocaleChanged}
                                        className="px-2 py-1.5 border border-slate-300 dark:border-zinc-700 rounded-md text-sm font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 cursor-pointer"
                                    >
                                        {LOCALE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <a
                                    href={serverConfig.referenceDocUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-md text-sm font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800  focus:outline-none"
                                >
                                    {t.referenceDoc}
                                </a>
                            </div>
                        </div>
                    </header>

                    <main className="mx-auto px-4 mt-2 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-[36rem_minmax(0,1fr)] gap-4 items-start">
                            {/* Settings & Controls Panel */}
                            <div className="space-y-4">
                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                                    {/* key={server} forces Weights/Filters/TierList to remount
                      with fresh server-appropriate defaults whenever the
                      active server changes. */}
                                    <Weights key={server} onChange={this.onWeightsChanged} />
                                </div>

                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                                    <SelectedCards
                                        selectedCards={this.state.selectedCards}
                                        onClick={this.onCardRemoved}
                                        onLoadPreset={this.onLoadPreset}
                                        weights={this.state.weights}
                                    />
                                </div>

                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                                    <Filters
                                        key={server}
                                        onCardsChanged={this.onCardsChanged}
                                    />
                                </div>
                            </div>

                            {/* Tier List Results Panel (Takes full width remaining) */}
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                                <TierList
                                    key={server}
                                    cards={this.state.availableCards}
                                    weights={this.state.weights}
                                    selectedCards={this.state.selectedCards}
                                    cardSelected={this.onCardSelected}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </AppContext.Provider>
        )
    }
}

export default Main

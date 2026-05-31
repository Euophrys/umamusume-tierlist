// Localization strings for the tier list UI.
//
// Two locales are supported, each representing the terminology used on a
// particular server. Players are free to mix the locale with either server's
// data set (e.g. browse the Global tier list using JP terms or vice versa).
//
// Each locale is a flat object so components can access keys directly.

const jp = {
    // App header
    appTitle: "Uma Musume Support Card Tier List",
    serverShort: { jp: "JP", gl: "Global" },
    referenceDoc: "Reference Document",
    serverLabel: "Server",
    localeLabel: "Terminology",

    // Stat names
    speed: "Speed",
    stamina: "Stamina",
    power: "Power",
    guts: "Guts",
    wisdom: "Wisdom",
    friend: "Friend",
    motivation: "Motivation",
    skillPts: "Skill Pts",
    energy: "Energy",

    // Tier list panel
    tierListResults: "Tier List Results",
    rankingFor: (ordinal, type) =>
        `Ranking for the ${ordinal} ${type} card in this deck:`,
    showStats: "Show Stats:",
    none: "None",
    noCards: "No cards matching the selected filters.",

    // Filters panel
    cardFilters: "Card Filters",
    rarityLimitBreak: "Rarity & Limit Break",

    // Selected cards panel
    supportDeck: "Support Deck",
    cardsCount: (n) => `${n} / 6 Cards`,
    deckHelp:
        "Click a card below to remove it, or click a card in the tier list to add it. The tier list score is for adding the card to this deck.",
    totalRaceBonus: "Total Race Bonus:",
    raceBonusAim: "Aim for",
    raceBonusFirstScenarios: "(URA/Aoharu)",
    raceBonusSecondScenarios: "(MANT)",
    eventHelperLink: "Open in Gametora Event Helper ↗",
    presets: "Presets",

    // Weights panel
    selectStatType: "Select Stat Type",
    hideSettings: "Hide Settings",
    customizeSettings: "Customize Settings",
    scenarioPresets: "Scenario Presets",
    scenarioPresetsHelp:
        "Swaps training gains and multipliers to match specific game scenarios.",
    bondRate: "Bond Rate",
    bondRateHelp: "Average bond gained per turn.",
    optionalRaces: "Optional Races",
    optionalRacesHelp:
        "Counts of G1, G2/G3, and OP races run for calculating Race Bonus points.",
    scenarioModifiers: "Scenario Modifiers",
    scenarioModifiersHelp: "Like MANT items or GL song bonuses.",
    multiplier: "Multiplier",
    specBonus: "Spec. Bonus",
    statWeights: "Stat Weights",
    statWeightsHelp: "Multiplier values assigned to each specific training stat.",
    statCap: "Stat Cap",
    minTrainScore: "Min Train Score",
    rainbowAlterations: "Rainbow Rate Alterations",
    prioritizeStat: "Prioritize This Stat",
    prioritizeStatHelp:
        "If unchecked, ignore single rainbows in this stat if other stats are rainbowing.",
    onlySummer: "Only Train In Summer",
    onlySummerHelp:
        "All rainbows will be ignored in this stat except in summer.",
    umaBonuses: "Uma's Bonuses",
    umaBonusesHelp:
        "Percentages on your Uma's stat screen in decimals (e.g. 10% is 1.1, 15% is 1.15).",

    // Support card properties (displayed in TierList "Show Stats" dropdowns)
    supportCardProperties: {
        race_bonus: { friendly_name: "Race Bonus", shorthand: "RB" },
        tb: { friendly_name: "Training Bonus", shorthand: "TB" },
        fs_bonus: { friendly_name: "Friendship Bonus", shorthand: "FB" },
        mb: { friendly_name: "Motivation Bonus", shorthand: "MB" },
        sb: { friendly_name: "Starting Bond", shorthand: "SB" },
        specialty_rate: { friendly_name: "Specialty Rate", shorthand: "SR" },
        hint_rate: { friendly_name: "Hint Rate", shorthand: "HR" },
    },

    // Scenario short labels (used by Weights preset buttons)
    scenarioLabels: {
        DYI: "DYI",
        GM: "GM",
        GL: "GL",
        MANT: "MANT",
        Aoharu: "Aoharu",
        URA: "URA",
    },

    // Built-in deck presets
    presetLabels: {
        "speed-power": "Speed/Power",
        "speed-stamina": "Speed/Stamina",
        "speed-int": "Speed/Int",
        "guts-int": "Guts/Int",
        "aoharu-parent": "Aoharu Parent",
        highlander: "Highlander",
        "race-bonus": "Race Bonus",
    },
}

const gl = {
    ...jp,
    // Stat / mechanic name overrides
    wisdom: "Wit",
    friend: "Pal",
    motivation: "Mood Effect",

    // Tier list panel uses translated type names through the `wisdom`/`friend` keys above.

    // Selected cards panel: the scenarios are renamed on the Global server.
    bondRateHelp: "Average bond points gained per turn.",
    raceBonusFirstScenarios: "(URA/Unity)",
    raceBonusSecondScenarios: "(TB)",
    scenarioModifiersHelp:
        "Like TB items or GL friendship song multipliers.",

    supportCardProperties: {
        race_bonus: { friendly_name: "Race Bonus", shorthand: "RB" },
        tb: { friendly_name: "Training Effectiveness", shorthand: "TB" },
        fs_bonus: { friendly_name: "Friendship Bonus", shorthand: "FB" },
        mb: { friendly_name: "Mood Effect", shorthand: "MB" },
        sb: { friendly_name: "Initial Friendship Gauge", shorthand: "FG" },
        specialty_rate: { friendly_name: "Specialty Priority", shorthand: "SP" },
        hint_rate: { friendly_name: "Hint Frequency", shorthand: "HF" },
    },

    scenarioLabels: {
        DYI: "DYI",
        GM: "GM",
        GL: "GL",
        MANT: "TB",
        Aoharu: "Unity",
        URA: "URA",
    },

    presetLabels: {
        ...jp.presetLabels,
        "speed-int": "Speed/Wit",
        "guts-int": "Guts/Wit",
    },
}

export const LOCALES = { jp, gl }

export const LOCALE_OPTIONS = [
    { value: "jp", label: "JP terminology" },
    { value: "gl", label: "Global terminology" },
]

export function getLocale(key) {
    return LOCALES[key] || LOCALES.jp
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

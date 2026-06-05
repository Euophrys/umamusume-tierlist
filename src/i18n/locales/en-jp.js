// English locale using JP server terminology.
//
// This is the base locale that every other locale falls back to for any
// untranslated keys. Add new locales by creating a sibling file and
// registering it in `../locales.js`.

const locale = {
  id: "en-jp",
  label: "English (JP terms)",
  // No `extends`: this locale is the root that other locales inherit from
  // when they only need to override a handful of strings.
  extends: null,
  strings: {
    // App header
    appTitle: "Uma Musume Support Card Tier List",
    serverShort: { jp: "JP", gl: "Global" },
    referenceDoc: "Ref Doc",
    serverLabel: "Server",
    localeLabel: "Language",

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
    importCollection: "Import Collection",
    importCollectionHelp:
      "Paste a Gametora collection export to restrict the tier list to cards you own.",
    importCollectionPlaceholder: "Paste the JSON exported from Gametora here…",
    importCollectionSource: "Collection server",
    importCollectionSourceJp: "JP",
    importCollectionSourceGl: "Global",
    importButton: "Import",
    cancel: "Cancel",
    collectionLoaded: (n) =>
      `Collection loaded — ${n} card${n === 1 ? "" : "s"}.`,
    collectionLoadedFiltered: (shown, total) =>
      `Showing ${shown} of ${total} owned card${total === 1 ? "" : "s"} for this server.`,
    discardCollection: "Discard collection",
    importErrorInvalidJson:
      "Could not parse JSON. Make sure you pasted the whole export.",
    importErrorNoSupports: "No supports found in the selected server's data.",
    importErrorEmpty: "Paste your Gametora export first.",

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
    statWeightsHelp:
      "Multiplier values assigned to each specific training stat.",
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
  },
}

export default locale

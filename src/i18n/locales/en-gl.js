// English locale using Global server terminology.
//
// Inherits everything from `en-jp` and only overrides keys that change on
// the Global server (stat names, scenario names, etc.). When the base
// locale gains new keys, this locale picks them up automatically.

const locale = {
  id: "en-gl",
  label: "English (Global terms)",
  extends: "en-jp",
  strings: {
    // Stat / mechanic name overrides
    wisdom: "Wit",
    friend: "Pal",
    motivation: "Mood Effect",

    // Selected cards panel: the scenarios are renamed on the Global server.
    bondRateHelp: "Average bond points gained per turn.",
    raceBonusFirstScenarios: "(URA/Unity)",
    raceBonusSecondScenarios: "(TB)",
    scenarioModifiersHelp: "Like TB items or GC friendship song multipliers.",

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
      GL: "GC",
      MANT: "TB",
      Aoharu: "Unity",
      URA: "URA",
    },

    presetLabels: {
      "speed-int": "Speed/Wit",
      "guts-int": "Guts/Wit",
    },
  },
}

export default locale

// Scenario configurations for the Uma Musume tier list.
//
// Each scenario describes weights and training gains used by the calculator.
// The JP and Global servers tweak a few constants (most notably bondPerDay
// and certain scenarioLink character names), so we keep one full bundle per
// server here. The shape of every scenario object is identical to the
// previous inline `defaultXxxState()` returns inside Weights.jsx so the
// component can consume them as-is.

const jp = {
  DYI: {
    version: 30,
    currentState: "speed",
    show: false,
    general: {
      bondPerDay: 15,
      races: [10, 2, 0, 3],
      unbondedTrainingGain: [
        [12, 0, 1, 0, 0, 6, 20],
        [0, 9, 0, 5, 0, 6, 20],
        [0, 3, 11, 0, 0, 6, 20],
        [2, 0, 2, 10, 0, 6, 20],
        [2, 0, 0, 0, 8, 5, 0],
      ],
      bondedTrainingGain: [
        [15, 0, 2, 0, 0, 6, 23],
        [0, 11, 0, 6, 0, 6, 23],
        [0, 4, 14, 0, 0, 6, 23],
        [3, 0, 2, 13, 0, 6, 23],
        [3, 0, 0, 0, 11, 5, 0],
      ],
      summerTrainingGain: [
        [17, 0, 3, 0, 0, 6, 25],
        [0, 13, 0, 7, 0, 6, 25],
        [0, 5, 16, 0, 0, 6, 25],
        [3, 0, 3, 15, 0, 6, 25],
        [4, 0, 0, 0, 13, 5, 0],
      ],
      umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
      multi: 1,
      bonusSpec: 20,
      motivation: 0.2,
      scenarioLink: ["タッカーブライン"],
      scenarioBonus: 1000,
      fanBonus: 0.05,
    },
    speed: {
      type: 0,
      stats: [2, 0.5, 2.5, 0.5, 0.5, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    stamina: {
      type: 1,
      stats: [1, 2.5, 1, 1.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    power: {
      type: 2,
      stats: [1, 2, 2, 0.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    guts: {
      type: 3,
      stats: [2.5, 1.5, 2.5, 1, 1, 1, 1],
      cap: 400,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    wisdom: {
      type: 4,
      stats: [1.5, 1.5, 1.5, 1, 2, 1, 1],
      cap: 300,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    friend: {
      type: 6,
      stats: [1, 1, 1, 1, 1, 1, 1],
      cap: 500,
      minimum: 0,
    },
  },
  GM: {
    version: 26,
    currentState: "speed",
    show: false,
    general: {
      bondPerDay: 15,
      races: [10, 2, 0, 5],
      unbondedTrainingGain: [
        [10, 0, 3, 0, 0, 5, 19],
        [0, 8, 0, 6, 0, 5, 20],
        [0, 4, 9, 0, 0, 5, 20],
        [2, 0, 3, 9, 0, 5, 20],
        [2, 0, 0, 0, 8, 5, 0],
      ],
      bondedTrainingGain: [
        [13, 0, 4, 0, 0, 5, 23],
        [0, 9, 0, 6, 0, 5, 21],
        [0, 4, 10, 0, 0, 5, 21],
        [3, 0, 3, 12, 0, 5, 24],
        [3, 0, 0, 0, 11, 5, 0],
      ],
      summerTrainingGain: [
        [14, 0, 5, 0, 0, 5, 24],
        [0, 12, 0, 8, 0, 5, 25],
        [0, 6, 13, 0, 0, 5, 25],
        [4, 0, 4, 13, 0, 5, 25],
        [4, 0, 0, 0, 12, 5, 0],
      ],
      umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
      multi: 1.25,
      bonusSpec: 0,
      motivation: 0.2,
      scenarioLink: ["ダーレーアラビアン"],
      scenarioBonus: 150,
      fanBonus: 0.1,
    },
    speed: {
      type: 0,
      stats: [2, 0.5, 2.5, 0.5, 0.5, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    stamina: {
      type: 1,
      stats: [1, 2.5, 1, 1.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    power: {
      type: 2,
      stats: [1, 2, 2, 0.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    guts: {
      type: 3,
      stats: [2.5, 1.5, 2.5, 1, 1, 1, 1],
      cap: 400,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    wisdom: {
      type: 4,
      stats: [1.5, 1.5, 1.5, 1, 2, 1, 1],
      cap: 300,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    friend: {
      type: 6,
      stats: [1, 1, 1, 1, 1, 1, 1],
      cap: 500,
      minimum: 0,
    },
  },
  GL: {
    version: 18,
    currentState: "speed",
    show: false,
    general: {
      bondPerDay: 20,
      races: [7, 2, 0, 3],
      unbondedTrainingGain: [
        [8, 0, 4, 0, 0, 2, 19],
        [0, 8, 0, 6, 0, 2, 20],
        [0, 4, 9, 0, 0, 2, 20],
        [2, 0, 2, 7, 0, 2, 20],
        [2, 0, 0, 0, 6, 3, 0],
      ],
      bondedTrainingGain: [
        [11, 0, 5, 0, 0, 2, 23],
        [0, 9, 0, 6, 0, 2, 21],
        [0, 4, 10, 0, 0, 2, 21],
        [3, 0, 2, 10, 0, 2, 24],
        [3, 0, 0, 0, 9, 3, 0],
      ],
      summerTrainingGain: [
        [12, 0, 6, 0, 0, 2, 24],
        [0, 12, 0, 8, 0, 2, 25],
        [0, 6, 13, 0, 0, 2, 25],
        [3, 0, 3, 11, 0, 2, 25],
        [4, 0, 0, 0, 10, 3, 0],
      ],
      umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
      multi: 1.4,
      bonusSpec: 20,
      motivation: 0.2,
      scenarioLink: [
        "ミホノブルボン",
        "Mihono Bourbon",
        "ライトハロー",
        "Light Hello",
        "スマートファルコン",
        "Smart Falcon",
        "アグネスタキオン",
        "Agnes Tachyon",
        "サイレンススズカ",
        "Silence Suzuka"
      ],
      scenarioBonus: 75,
      fanBonus: 0.05,
    },
    speed: {
      type: 0,
      stats: [2, 0.5, 2.5, 0.5, 0.5, 0.5, 1],
      cap: 500,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    stamina: {
      type: 1,
      stats: [1, 2.5, 1, 1.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    power: {
      type: 2,
      stats: [1, 2, 2, 0.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    guts: {
      type: 3,
      stats: [2.5, 1.5, 2.5, 1, 1, 1, 1],
      cap: 400,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    wisdom: {
      type: 4,
      stats: [1.5, 1.5, 1.5, 1, 2, 0.5, 1],
      cap: 300,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    friend: {
      type: 6,
      stats: [1, 1, 1, 1, 1, 1, 1],
      cap: 500,
      minimum: 0,
    },
  },
  MANT: {
    version: 18,
    currentState: "speed",
    show: false,
    general: {
      bondPerDay: 20,
      races: [15, 10, 2, 3],
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
        [12, 0, 6, 0, 0, 2, 24],
        [0, 11, 0, 5, 0, 2, 22],
        [0, 6, 10, 0, 0, 2, 23],
        [4, 0, 4, 10, 0, 2, 25],
        [4, 0, 0, 0, 10, 3, 0],
      ],
      umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
      multi: 1.4,
      bonusSpec: 0,
      motivation: 0.2,
      scenarioLink: [],
      scenarioBonus: 0,
      fanBonus: 0.15,
    },
    speed: {
      type: 0,
      stats: [2, 0.5, 2.5, 0.5, 0.5, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    stamina: {
      type: 1,
      stats: [1, 2.5, 1, 1.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    power: {
      type: 2,
      stats: [1, 2, 2, 0.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    guts: {
      type: 3,
      stats: [2.5, 1.5, 2.5, 1, 1, 1, 1],
      cap: 400,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    wisdom: {
      type: 4,
      stats: [1.5, 1.5, 1.5, 1, 2, 1, 1],
      cap: 300,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    friend: {
      type: 6,
      stats: [1, 1, 1, 1, 1, 1, 1],
      cap: 500,
      minimum: 0,
    },
  },
  Aoharu: {
    version: 18,
    currentState: "wisdom",
    show: false,
    general: {
      bondPerDay: 20,
      races: [7, 2, 0, 3],
      unbondedTrainingGain: [
        [8, 0, 4, 0, 0, 4, 19],
        [0, 8, 0, 6, 0, 4, 20],
        [0, 4, 9, 0, 0, 4, 20],
        [3, 0, 3, 6, 0, 4, 20],
        [2, 0, 0, 0, 6, 5, 0],
      ],
      bondedTrainingGain: [
        [12, 0, 5, 0, 0, 4, 24],
        [0, 12, 0, 7, 0, 4, 25],
        [0, 5, 13, 0, 0, 4, 25],
        [4, 0, 3, 10, 0, 4, 25],
        [3, 0, 0, 0, 10, 5, 0],
      ],
      summerTrainingGain: [
        [13, 0, 6, 0, 0, 4, 25],
        [0, 13, 0, 8, 0, 4, 26],
        [0, 6, 14, 0, 0, 4, 26],
        [4, 0, 4, 11, 0, 4, 26],
        [4, 0, 0, 0, 11, 5, 0],
      ],
      umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
      multi: 1,
      bonusSpec: 0,
      motivation: 0.2,
      scenarioLink: [
        "マチカネフクキタル",
        "ハルウララ",
        "樫本理子",
        "ライスシャワー",
        "タイキシャトル",
      ],
      scenarioBonus: 40,
      fanBonus: 0.05,
    },
    speed: {
      type: 0,
      stats: [2, 0.5, 2.5, 0.5, 0.5, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    stamina: {
      type: 1,
      stats: [1, 2.5, 1, 1.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    power: {
      type: 2,
      stats: [1, 2, 2, 0.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    guts: {
      type: 3,
      stats: [2.5, 1.5, 2.5, 1, 1, 1, 1],
      cap: 400,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    wisdom: {
      type: 4,
      stats: [1.5, 1.5, 1.5, 1, 2, 1, 1],
      cap: 300,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    friend: {
      type: 6,
      stats: [1, 1, 1, 1, 1, 1, 1],
      cap: 500,
      minimum: 0,
    },
  },
  URA: {
    version: 18,
    currentState: "speed",
    show: false,
    general: {
      bondPerDay: 20,
      races: [7, 2, 0, 3],
      unbondedTrainingGain: [
        [11, 0, 6, 0, 0, 4, 21],
        [0, 10, 0, 6, 0, 4, 19],
        [0, 6, 9, 0, 0, 4, 20],
        [5, 0, 5, 8, 0, 4, 22],
        [2, 0, 0, 0, 10, 5, 0],
      ],
      bondedTrainingGain: [
        [13, 0, 6, 0, 0, 4, 23],
        [0, 11, 0, 6, 0, 4, 21],
        [0, 6, 11, 0, 0, 4, 22],
        [5, 0, 5, 10, 0, 4, 24],
        [2, 0, 0, 0, 12, 5, 0],
      ],
      summerTrainingGain: [
        [15, 0, 8, 0, 0, 4, 24],
        [0, 14, 0, 7, 0, 4, 25],
        [0, 8, 13, 0, 0, 4, 25],
        [6, 0, 6, 12, 0, 4, 25],
        [4, 0, 0, 0, 14, 5, 0],
      ],
      umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
      multi: 1,
      bonusSpec: 0,
      motivation: 0.2,
      scenarioLink: ["桐生院葵"],
      scenarioBonus: 16,
      fanBonus: 0.05,
    },
    speed: {
      type: 0,
      stats: [2, 0.5, 2.5, 0.5, 0.5, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    stamina: {
      type: 1,
      stats: [1, 2.5, 1, 1.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    power: {
      type: 2,
      stats: [1, 2, 2, 0.5, 1, 1, 1],
      cap: 500,
      minimum: 0,
      prioritize: false,
      onlySummer: false,
    },
    guts: {
      type: 3,
      stats: [2.5, 1.5, 2.5, 1, 1, 1, 1],
      cap: 400,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    wisdom: {
      type: 4,
      stats: [1.5, 1.5, 1.5, 1, 2, 1, 1],
      cap: 300,
      minimum: 0,
      prioritize: true,
      onlySummer: false,
    },
    friend: {
      type: 6,
      stats: [1, 1, 1, 1, 1, 1, 1],
      cap: 500,
      minimum: 0,
    },
  },
}

// Global server scenarios. They share the JP shape but tweak a few constants
// (notably bondPerDay defaults and a translated URA scenarioLink name).
const gl = {
  GM: { ...jp.GM, general: { ...jp.GM.general, bondPerDay: 10 } },
  GL: { ...jp.GL, general: { ...jp.GL.general, bondPerDay: 10 } },
  MANT: { ...jp.MANT, general: { ...jp.MANT.general, bondPerDay: 10 } },
  Aoharu: { ...jp.Aoharu, general: { ...jp.Aoharu.general, bondPerDay: 10 } },
  URA: {
    ...jp.URA,
    general: {
      ...jp.URA.general,
      bondPerDay: 10,
      scenarioLink: ["Aoi Kiryuin"],
    },
  },
}

export const SCENARIOS_BY_SERVER = { jp, gl }

export const SERVER_CONFIG = {
  jp: {
    availableScenarios: ["DYI", "GM", "GL", "MANT", "Aoharu", "URA"],
    defaultScenario: "DYI",
    referenceDocUrl:
      "https://docs.google.com/document/d/1gNcV7XLmxx0OI2DEAR8gmKb8P9BBhcwGhlJOVbYaXeo/edit?usp=sharing",
    defaultLocale: "en-jp",
    defaultPresetCards: [30226, 30256, 30187, 30233, 30257],
    defaultFilters: {
      ssr: [true, false, false, false, false],
      sr: [true, false, false, false, false],
      r: [false, false, false, false, false],
    },
    defaultTierListDropdown: "none",
    // The JP cards.js stores fs_bonus in a different format than Global.
    // Preserve the original per-server display formula.
    useLegacyFsBonusDisplay: true,
    // Preset deck IDs shown in SelectedCards.
    deckPresets: [
      { key: "speed-power", cards: [20023, 20033, 20009, 20003, 30137] },
      { key: "speed-stamina", cards: [20023, 20033, 20008, 30022, 30137] },
      { key: "speed-int", cards: [20023, 20033, 20012, 20002, 30137] },
      { key: "guts-int", cards: [30028, 20048, 20041, 20012, 20002] },
      { key: "aoharu-parent", cards: [20012, 20016, 20025, 20002, 10060] },
      { key: "highlander", cards: [30028, 20008, 20009, 30019, 20012] },
      { key: "race-bonus", cards: [20031, 30074, 20027, 20012, 30054] },
    ],
  },
  gl: {
    availableScenarios: ["DYI", "GM", "GL", "MANT", "Aoharu", "URA"],
    defaultScenario: "GL",
    referenceDocUrl:
      "https://docs.google.com/document/d/11X2P7pLuh-k9E7PhRiD20nDX22rNWtCpC1S4IMx_8pQ/edit?usp=sharing",
    defaultLocale: "en-gl",
    defaultPresetCards: [20031, 20033, 20012, 20015, 30052],
    defaultFilters: {
      ssr: [true, false, true, false, true],
      sr: [true, false, true, false, true],
      r: [false, false, false, false, true],
    },
    defaultTierListDropdown: "race_bonus",
    useLegacyFsBonusDisplay: false,
    deckPresets: [
      { key: "speed-power", cards: [30028, 20031, 20033, 20009, 20003] },
      { key: "speed-stamina", cards: [30028, 20031, 20033, 20008, 30022] },
      { key: "speed-int", cards: [30028, 20031, 20033, 20012, 20002] },
      { key: "guts-int", cards: [30011, 30030, 30019, 20012, 20002] },
      { key: "race-bonus", cards: [20031, 30074, 20027, 20012, 30054] },
    ],
  },
}

export function getServerConfig(server) {
  return SERVER_CONFIG[server] || SERVER_CONFIG.jp
}

export function getScenarios(server) {
  return SCENARIOS_BY_SERVER[server] || SCENARIOS_BY_SERVER.jp
}

// Clone-on-read so component state mutation does not leak back into the
// shared scenario definitions.
export function getScenario(server, scenarioKey) {
  const scenarios = getScenarios(server)
  const scenario =
    scenarios[scenarioKey] || scenarios[getServerConfig(server).defaultScenario]
  return JSON.parse(JSON.stringify(scenario))
}

export function getDefaultScenario(server) {
  return getScenario(server, getServerConfig(server).defaultScenario)
}

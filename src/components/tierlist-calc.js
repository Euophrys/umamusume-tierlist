import events from "../card-events"

// ─── Conventions used throughout this file ───────────────────────────────────
//
// A card's `type` indexes into the same array as the stats it can give:
//   0 Speed · 1 Stamina · 2 Power · 3 Guts · 4 Wit · 5 skill points · 6 energy
// Trainings only exist for 0..4. There's no card type for skill points (5),
// leaving a gap, and GROUP_TYPE (6, energy) is used for group ("friend") cards
// that aren't tied to a single training.
//
// Stat / gain arrays follow the same layout:
//   [0..4] the five training stats · [5] skill points · [6] energy
// Card-event arrays add one more slot: [7] bond.
//
// Card field shorthands (defined in the card data files):
//   sb  starting bond        tb  training bonus       mb  motivation bonus
//   fs_*  friendship ("rainbow") bonuses, applied only while the card rainbows
//   stat_bonus[6]  flat per-stat bonus   specialty_rate  specialty priority
//
// See CLAUDE.md in this folder for the underlying game mechanics.

const STAT_COUNT = 6 // five training stats + skill points
const TRAINING_COUNT = 5
const ENERGY = 6 // index of energy within gain / weight arrays
const BOND = 7 // index of bond within card-event arrays
const GROUP_TYPE = 6

// Appearance-rate weights (CLAUDE.md → "Appearance Rate"). Each of the five
// trainings has base weight 100; there's also a weight-50 "no training" option.
// For one card, P(lands on specialty) = specialty / (specialty + 450), where
// 450 = the other four trainings (4×100) plus the 50 no-training slot.
const BASE_WEIGHT = 100
const OTHER_SLOTS_WEIGHT = 450

// Bond points needed to start rainbowing, before the card's innate starting
// bond and any event bond are subtracted.
const GROUP_BOND = 55
const NORMAL_BOND = 75

// Each support card sharing a training adds 5% output: factor (1 + 0.05·N).
const CARD_BONUS = 1.05

const SUMMER_RAINBOW_DAYS = 8

export const raceRewards = [
  [2, 2, 2, 2, 2, 35],
  [1.6, 1.6, 1.6, 1.6, 1.6, 25],
  [1, 1, 1, 1, 1, 20],
  [13.5, 13.5, 13.5, 13.5, 13.5, 50],
]

// Probability that this card lands on its specialty training (onSpecialty) vs.
// any single off-specialty training (offSpecialty).
function specialtyChances(card, weights) {
  const specialty =
    (BASE_WEIGHT + card.specialty_rate + weights.bonusSpec) *
    card.unique_specialty *
    card.fs_specialty
  return {
    onSpecialty: specialty / (OTHER_SLOTS_WEIGHT + specialty),
    offSpecialty: BASE_WEIGHT / (OTHER_SLOTS_WEIGHT + specialty),
  }
}

const deepClone = (value) => JSON.parse(JSON.stringify(value))

export function processCards(cards, weights, selectedCards) {
  let processedCards = []
  selectedCards = deepClone(selectedCards)

  // Pre-process the fixed deck (the cards the user already picked): record
  // which training types are present, group cards by type, and tally the bond
  // the whole deck needs before anyone can rainbow.
  let presentTypes = [false, false, false, false, false, false, false]
  let cardsPerType = [[], [], [], [], [], [], []]
  let baseBondNeeded = 0
  for (let i = 0; i < selectedCards.length; i++) {
    let selectedCard = selectedCards[i]
    const chances = specialtyChances(selectedCard, weights)
    selectedCard.rainbowSpecialty = chances.onSpecialty
    selectedCard.offSpecialty = chances.offSpecialty
    selectedCard.cardType = selectedCard.type
    selectedCard.index = i
    presentTypes[selectedCard.cardType] = true
    cardsPerType[selectedCard.cardType].push(selectedCard)

    baseBondNeeded +=
      (selectedCard.cardType == GROUP_TYPE ? GROUP_BOND : NORMAL_BOND) -
      selectedCard.sb
    if (events[selectedCard.id]) {
      baseBondNeeded -= events[selectedCard.id][BOND]
    }
  }

  // Chance that at least one off-type training rainbows on a given turn, used
  // later to discount a candidate's own rainbow rate (you can only be in one
  // training per turn). Skips the stat type the weights are optimising for.
  let preferredRainbowChances = [0, 0, 0, 0, 0]
  for (let type = 0; type < TRAINING_COUNT; type++) {
    if (type == weights.type) continue
    if (cardsPerType[type].length === 0) continue

    const minimum = weights.prioritize ? 2 : 1
    let combos = GetCombinations(cardsPerType[type], minimum)
    preferredRainbowChances[type] = combos.reduce(
      (total, combo) =>
        total + CalculateCombinationChance(combo, undefined, type),
      0
    )
  }

  let chanceOfPreferredRainbow =
    1 -
    preferredRainbowChances.reduce(
      (product, chance) => product * (1 - chance),
      1
    )

  // Score each candidate card as if it were added to the fixed deck.
  for (let i = 0; i < cards.length; i++) {
    let info = {}
    let card = deepClone(cards[i])
    let cardType = card.type
    card.index = 6 // distinct from the selected cards' indices (0..5)

    let bondNeeded =
      baseBondNeeded +
      (cardType == GROUP_TYPE ? GROUP_BOND : NORMAL_BOND) -
      card.sb

    let presentTypesWithCard = presentTypes.slice()
    presentTypesWithCard[cardType] = true
    let typeCount = presentTypesWithCard.filter(Boolean).length

    let score = card.sb
    let energyGain = 0
    let statGains = card.starting_stats.slice()
    statGains.push(0) // skill-points slot

    info.starting_stats = card.starting_stats.slice()
    info.event_stats = [0, 0, 0, 0, 0, 0, 0]

    // Event rewards (or, for cards without an event entry, the flat rarity
    // bonuses). Both also reduce the bond still needed and add to the score.
    if (events[card.id]) {
      info.event_stats = events[card.id].slice()
      for (let stat = 0; stat < STAT_COUNT; stat++) {
        statGains[stat] += events[card.id][stat] * card.effect_size_up
        info.event_stats[stat] = events[card.id][stat] * card.effect_size_up
      }
      energyGain += events[card.id][ENERGY] * card.energy_up
      bondNeeded -= events[card.id][BOND]
      score += events[card.id][BOND]
    } else {
      if (card.rarity === 2) {
        for (let stat = 0; stat < TRAINING_COUNT; stat++) statGains[stat] += 7
        bondNeeded -= 5
      } else if (card.rarity === 3) {
        for (let stat = 0; stat < TRAINING_COUNT; stat++) statGains[stat] += 9
        bondNeeded -= 5
      }
      score += 5
    }

    // "Initial <Stat>" bonuses granted once per card in the run: the candidate
    // plus every deck member. Group cards spread the bonus across all 5 stats.
    if (card.type_stats > 0) {
      statGains[card.type] += card.type_stats
      for (let s = 0; s < selectedCards.length; s++) {
        if (selectedCards[s].type < GROUP_TYPE) {
          statGains[selectedCards[s].type] += card.type_stats
        } else {
          for (let stat = 0; stat < TRAINING_COUNT; stat++) {
            statGains[stat] += card.type_stats / 5
          }
        }
      }
    }

    // Split the run's training days into the bonding phase (before the card
    // hits max bond) and the rainbow phase (after).
    let trainingDays =
      65 - weights.races[0] - weights.races[1] - weights.races[2]
    if (cardType === GROUP_TYPE) trainingDays -= 5
    let daysToBond = bondNeeded / weights.bondPerDay
    let rainbowDays = trainingDays - daysToBond

    const chances = specialtyChances(card, weights)
    let specialtyPercent = chances.onSpecialty
    let otherPercent = chances.offSpecialty
    let offstatAppearanceDenominator = card.offstat_appearance_denominator

    let daysPerTraining = [0, 0, 0, 0, 0]
    let bondedDaysPerTraining = [0, 0, 0, 0, 0]
    let rainbowTraining = 0

    // Non-group cards can only rainbow in one training per turn, so discount
    // their rainbow time by the chance a preferred off-type rainbow steals it.
    let rainbowOverride = 1
    if (cardType != GROUP_TYPE) {
      card.rainbowSpecialty = specialtyPercent
      card.offSpecialty = otherPercent
      let cardsOfThisType = cardsPerType[cardType].slice()
      cardsOfThisType.push(card)

      let chanceOfSingleRainbow = 0
      for (let j = 0; j < cardsOfThisType.length; j++) {
        chanceOfSingleRainbow += CalculateCombinationChance(
          [cardsOfThisType[j]],
          cardsOfThisType,
          cardType
        )
      }
      rainbowOverride = 1 - chanceOfPreferredRainbow * chanceOfSingleRainbow
    }

    // Distribute bonding-phase and rainbow-phase days across the trainings.
    for (let stat = 0; stat < TRAINING_COUNT; stat++) {
      if (stat == cardType) {
        rainbowTraining = specialtyPercent * rainbowDays * rainbowOverride
        daysPerTraining[stat] = specialtyPercent * daysToBond
      } else {
        daysPerTraining[stat] =
          (otherPercent / offstatAppearanceDenominator) * daysToBond
        bondedDaysPerTraining[stat] =
          (otherPercent / offstatAppearanceDenominator) * rainbowDays
      }
    }

    if (weights.onlySummer) {
      rainbowTraining = SUMMER_RAINBOW_DAYS * specialtyPercent * rainbowOverride
    }

    // Cards whose unique friendship bonus ramps up: average it over the first
    // ~2/3 of rainbow days, while the ramp is still climbing.
    if (card.fs_ramp[0] > 0) {
      let current_bonus = 0
      let total = 0
      for (let j = rainbowTraining * 0.66; j > 0; j--) {
        total += current_bonus
        current_bonus = Math.min(
          current_bonus + card.fs_ramp[0],
          card.fs_ramp[1]
        )
      }
      card.unique_fs_bonus = 1 + total / rainbowTraining / 100
    }

    // ── Bonding phase: off-specialty trainings, no friendship bonus ──
    info.non_rainbow_gains = [0, 0, 0, 0, 0, 0, 0]
    for (let training = 0; training < TRAINING_COUNT; training++) {
      let gains = weights.unbondedTrainingGain[training]
      let daysOnThisTraining = daysPerTraining[training]
      energyGain += daysOnThisTraining * gains[ENERGY] * card.energy_discount

      let trainingGains = CalculateCrossTrainingGain(
        gains,
        weights,
        card,
        selectedCards,
        training,
        daysOnThisTraining,
        typeCount,
        false
      )

      for (let stat = 0; stat < STAT_COUNT; stat++) {
        statGains[stat] += trainingGains[stat]
        info.non_rainbow_gains[stat] += trainingGains[stat]
      }
      info.non_rainbow_gains[ENERGY] +=
        daysOnThisTraining * gains[ENERGY] * card.energy_discount
    }

    // ── Rainbow phase: off-specialty trainings, deck members may rainbow ──
    for (let training = 0; training < TRAINING_COUNT; training++) {
      let gains = weights.bondedTrainingGain[training]
      let daysOnThisTraining = bondedDaysPerTraining[training]
      energyGain += daysOnThisTraining * gains[ENERGY] * card.energy_discount
      energyGain += daysOnThisTraining * gains[ENERGY] * card.fs_energy

      let trainingGains = CalculateCrossTrainingGain(
        gains,
        weights,
        card,
        selectedCards,
        training,
        daysOnThisTraining,
        typeCount,
        true
      )

      for (let stat = 0; stat < STAT_COUNT; stat++) {
        statGains[stat] += trainingGains[stat]
        info.non_rainbow_gains[stat] += trainingGains[stat]
      }

      info.non_rainbow_gains[ENERGY] +=
        daysOnThisTraining * gains[ENERGY] * card.energy_discount
      info.non_rainbow_gains[ENERGY] +=
        daysOnThisTraining * gains[ENERGY] * card.fs_energy

      if (training == 4 && card.group) {
        energyGain += (daysOnThisTraining * card.wisdom_recovery) / 5
      }
    }

    // ── Rainbow phase: the candidate's own specialty training ──
    info.rainbow_gains = [0, 0, 0, 0, 0, 0, 0]
    if (cardType < GROUP_TYPE) {
      energyGain += rainbowTraining * card.wisdom_recovery
      let specialtyGains = weights.onlySummer
        ? weights.summerTrainingGain[cardType]
        : weights.bondedTrainingGain[cardType]

      let trainingGains = CalculateTrainingGain(
        specialtyGains,
        weights,
        card,
        selectedCards,
        cardType,
        rainbowTraining,
        true,
        typeCount
      )

      info.rainbow_gains = trainingGains.slice()
      info.rainbow_gains.push(rainbowTraining * card.wisdom_recovery)

      for (let stat = 0; stat < STAT_COUNT; stat++) {
        statGains[stat] += trainingGains[stat]
      }
    }

    // Race rewards, scaled by the card's race bonus.
    info.race_bonus_gains = 0
    for (let raceType = 0; raceType < raceRewards.length; raceType++) {
      for (let stat = 0; stat < STAT_COUNT; stat++) {
        let gain =
          raceRewards[raceType][stat] *
          (card.race_bonus / 100) *
          weights.races[raceType]
        statGains[stat] += gain
        info.race_bonus_gains += gain
      }
    }

    score += GainsToScore(statGains, weights)
    score += energyGain * weights.stats[ENERGY]

    if (weights.scenarioLink.indexOf(card.char_name) > -1) {
      score += weights.scenarioBonus
    }

    processedCards.push({
      id: card.id,
      lb: card.limit_break,
      score: score,
      info: info,
      char_name: card.char_name,
    })
  }

  processedCards.sort((a, b) => b.score - a.score)
  return processedCards
}

// ─── Combination-bonus reducers ──────────────────────────────────────────────
// Each folds the bonuses contributed by the *other* cards sharing a training.
// Training and motivation bonuses add (less their identity of 1); friendship
// bonuses multiply, and only for cards on their own specialty training.

function comboTrainingBonus(combination, typeCount) {
  return combination.reduce((total, c) => {
    let training = total + (c.tb - 1) + combination.length * c.crowd_bonus
    if (typeCount >= c.highlander_threshold) training += c.highlander_training
    return training
  }, 1)
}

function comboFriendshipBonus(combination, trainingType) {
  return combination.reduce(
    (total, c) =>
      c.cardType === trainingType
        ? total * c.fs_bonus * c.unique_fs_bonus
        : total,
    1
  )
}

function comboMotivationBonus(combination) {
  return combination.reduce((total, c) => total + c.mb - 1, 1)
}

function comboStatBonus(combination, stat) {
  return combination.reduce((total, c) => total + c.stat_bonus[stat], 0)
}

// Gain from the candidate training on its own specialty. Sums over every way
// the deck members could join it that turn, weighted by how likely each is.
export function CalculateTrainingGain(
  gains,
  weights,
  card,
  otherCards,
  trainingType,
  days,
  rainbow,
  typeCount
) {
  let trainingGains = [0, 0, 0, 0, 0, 0, 0]

  let trainingBonus = card.tb + card.fan_bonus * weights.fanBonus
  if (typeCount >= card.highlander_threshold)
    trainingBonus += card.highlander_training
  let fsBonus = 1
  let motivationBonus = card.mb
  if (rainbow) {
    fsBonus = card.fs_bonus * card.unique_fs_bonus
    motivationBonus += card.fs_motivation
    trainingBonus += card.fs_training
  }

  // Case 1: the candidate trains alone.
  let soloGain = [0, 0, 0, 0, 0, 0]
  for (let stat = 0; stat < STAT_COUNT; stat++) {
    if (gains[stat] === 0) continue

    let base = gains[stat] + card.stat_bonus[stat]
    if (rainbow) base += card.fs_stats[stat]
    soloGain[stat] +=
      base *
      trainingBonus *
      (1 + weights.motivation * motivationBonus) *
      fsBonus *
      CARD_BONUS *
      weights.umaBonus[stat] -
      gains[stat]
  }
  if (GainsToScore(soloGain, weights) > weights.minimum) {
    for (let stat = 0; stat < STAT_COUNT; stat++) {
      trainingGains[stat] +=
        soloGain[stat] *
        days *
        CalculateCombinationChance([], otherCards, trainingType) *
        (rainbow ? weights.multi : 1)
    }
  }

  if (otherCards.length == 0) return trainingGains

  // Case 2: each non-empty subset of deck members joins the candidate. The
  // candidate's marginal contribution is (gain with it) − (gain without it).
  const combinations = GetCombinations(otherCards)
  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i]
    let withoutCandidate = [0, 0, 0, 0, 0, 0]
    let withCandidate = [0, 0, 0, 0, 0, 0]

    // The candidate's own training bonus, plus its crowd bonus for this many
    // cards on the training.
    const selfTrainingBonus =
      trainingBonus + (combination.length + 1) * card.crowd_bonus
    const combinationTrainingBonus = comboTrainingBonus(combination, typeCount)
    const combinationFriendshipBonus = comboFriendshipBonus(
      combination,
      trainingType
    )
    const combinationMotivationBonus = comboMotivationBonus(combination)

    for (let stat = 0; stat < STAT_COUNT; stat++) {
      if (gains[stat] === 0) continue

      let base = gains[stat] + comboStatBonus(combination, stat)
      if (rainbow) base += card.fs_stats[stat]

      withoutCandidate[stat] +=
        base *
        combinationTrainingBonus *
        (1 + weights.motivation * combinationMotivationBonus) *
        combinationFriendshipBonus *
        (CARD_BONUS * combination.length) *
        weights.umaBonus[stat]

      withCandidate[stat] +=
        (base + card.stat_bonus[stat]) *
        (combinationTrainingBonus + selfTrainingBonus - 1) *
        (1 +
          weights.motivation *
          (combinationMotivationBonus + motivationBonus - 1)) *
        (combinationFriendshipBonus * fsBonus) *
        (CARD_BONUS * (combination.length + 1)) *
        weights.umaBonus[stat]
    }

    if (GainsToScore(withCandidate, weights) > weights.minimum) {
      const chance = CalculateCombinationChance(
        combination,
        otherCards,
        trainingType
      )
      for (let stat = 0; stat < STAT_COUNT; stat++) {
        trainingGains[stat] +=
          (withCandidate[stat] - withoutCandidate[stat]) *
          days *
          chance *
          (rainbow ? weights.multi : 1)
      }
    }
  }

  return trainingGains
}

// Gain from the candidate training off its specialty. Only the deck members
// on *their* specialty (statCards) can rainbow here, so the candidate's
// contribution counts only for combinations that include such a card.
export function CalculateCrossTrainingGain(
  gains,
  weights,
  card,
  otherCards,
  trainingType,
  days,
  typeCount,
  bonded
) {
  let trainingGains = [0, 0, 0, 0, 0, 0, 0]
  let statCards = otherCards.filter((c) => c.cardType === trainingType)
  let trainingBonus = card.tb + card.fan_bonus * weights.fanBonus
  if (typeCount >= card.highlander_threshold)
    trainingBonus += card.highlander_training
  let fsBonus = 1
  if (card.group && bonded) {
    fsBonus += (card.fs_bonus + card.unique_fs_bonus - 1) / 5
  }

  const combinations = GetCombinations(otherCards)
  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i]
    let withoutCandidate = [0, 0, 0, 0, 0, 0]
    let withCandidate = [0, 0, 0, 0, 0, 0]

    // The candidate's own training bonus, plus its crowd bonus for this many
    // cards on the training.
    const selfTrainingBonus =
      trainingBonus + (combination.length + 1) * card.crowd_bonus
    const combinationTrainingBonus = comboTrainingBonus(combination, typeCount)
    const combinationFriendshipBonus = comboFriendshipBonus(
      combination,
      trainingType
    )
    const combinationMotivationBonus = comboMotivationBonus(combination)

    for (let stat = 0; stat < STAT_COUNT; stat++) {
      if (gains[stat] === 0) continue
      // Skip unless a rainbowing deck member is actually in this combination.
      if (!combination.some((r) => statCards.indexOf(r) > -1)) continue

      const base = gains[stat] + comboStatBonus(combination, stat)

      withoutCandidate[stat] +=
        base *
        combinationTrainingBonus *
        (1 + weights.motivation * combinationMotivationBonus) *
        combinationFriendshipBonus *
        (CARD_BONUS * combination.length) *
        weights.umaBonus[stat]

      if (bonded) {
        withCandidate[stat] +=
          (base + card.stat_bonus[stat] + card.fs_stats[stat]) *
          (combinationTrainingBonus +
            selfTrainingBonus +
            card.fs_training -
            1) *
          (1 +
            weights.motivation *
            (combinationMotivationBonus + card.mb + card.fs_motivation - 1)) *
          (combinationFriendshipBonus * fsBonus) *
          (CARD_BONUS * (combination.length + 1)) *
          weights.umaBonus[stat]
      } else {
        withCandidate[stat] +=
          (base + card.stat_bonus[stat]) *
          (combinationTrainingBonus + selfTrainingBonus - 1) *
          (1 +
            weights.motivation * (combinationMotivationBonus + card.mb - 1)) *
          (CARD_BONUS * (combination.length + 1)) *
          weights.umaBonus[stat]
      }
    }

    if (GainsToScore(withCandidate, weights) > weights.minimum) {
      const chance = CalculateCombinationChance(
        combination,
        otherCards,
        trainingType
      )
      for (let stat = 0; stat < STAT_COUNT; stat++) {
        trainingGains[stat] +=
          (withCandidate[stat] - withoutCandidate[stat]) *
          days *
          chance *
          weights.multi
      }
    }
  }

  return trainingGains
}

// Weighted sum of stat gains, each capped at weights.cap.
export function GainsToScore(gains, weights) {
  let score = 0
  for (let stat = 0; stat < STAT_COUNT; stat++) {
    score += Math.min(gains[stat], weights.cap) * weights.stats[stat]
  }
  return score
}

// Every subset of `cards` with at least `minLength` members (built by treating
// the bits of each number 0..2^n-1 as a membership mask).
export function GetCombinations(cards, minLength = 1) {
  let combinations = []
  const count = Math.pow(2, cards.length)

  for (let mask = 0; mask < count; mask++) {
    let subset = []
    for (let j = 0; j < cards.length; j++) {
      if (mask & Math.pow(2, j)) subset.push(cards[j])
    }
    if (subset.length >= minLength) combinations.push(subset)
  }

  return combinations
}

// Probability that exactly `combination` lands on `trainingType` this turn:
// the combination members do, and (when `cards` is given) none of the rest do.
export function CalculateCombinationChance(combination, cards, trainingType) {
  const landsOn = (card) =>
    card.cardType === trainingType ? card.rainbowSpecialty : card.offSpecialty

  let chance = combination.reduce((current, card) => current * landsOn(card), 1)

  if (cards) {
    const otherCards = cards.filter(
      (c) => combination.findIndex((d) => c.index == d.index) === -1
    )
    chance = otherCards.reduce(
      (current, card) => current * (1 - landsOn(card)),
      chance
    )
  }

  return chance
}

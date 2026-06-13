import React from "react"
import SupportCard from "./SupportCard"
import { AppContext } from "../i18n/context"
import { getTypeNames } from "../i18n/locales"
import Select from "react-select"
import { processCards } from "./tierlist-calc"

const ordinal = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"]

class TierList extends React.Component {
  static contextType = AppContext

  constructor(props, context) {
    super(props, context)

    // The Global server defaults the leftmost dropdown to "Race Bonus" while
    // JP defaults to "None". The active server config carries that choice.
    const defaultDropdown = context.serverConfig.defaultTierListDropdown
    this.state = {
      dropdownSelections: [defaultDropdown, "none", "none"],
    }

    this.onDropdown1Changed = this.onDropdown1Changed.bind(this)
    this.onDropdown2Changed = this.onDropdown2Changed.bind(this)
    this.onDropdown3Changed = this.onDropdown3Changed.bind(this)
  }

  //lmao
  onDropdown1Changed(newValue) {
    let newSelections = this.state.dropdownSelections.slice()
    newSelections[0] = newValue.value
    this.setState({ dropdownSelections: newSelections })
  }
  onDropdown2Changed(newValue) {
    let newSelections = this.state.dropdownSelections.slice()
    newSelections[1] = newValue.value
    this.setState({ dropdownSelections: newSelections })
  }
  onDropdown3Changed(newValue) {
    let newSelections = this.state.dropdownSelections.slice()
    newSelections[2] = newValue.value
    this.setState({ dropdownSelections: newSelections })
  }

  render() {
    const { t } = this.context
    const type_names = getTypeNames(t)
    const supportCardProperties = t.supportCardProperties

    let cards = this.props.cards
    let selectedNames = this.props.selectedCards.map((card) => card.char_name)

    if (this.props.weights.type > -1) {
      cards = cards.filter((e) => e.type === this.props.weights.type)
    }

    let processedCards = processCards(
      cards,
      this.props.weights,
      this.props.selectedCards
    )

    if (processedCards.length === 0) {
      return (
        <div className="tier-list font-sans text-center p-8 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl text-slate-400 dark:text-zinc-500 italic">
          {t.noCards}
        </div>
      )
    }

    let rows = [[]]
    let current_row = 0
    let step =
      (processedCards[0].score -
        processedCards[processedCards.length - 1].score) /
      7
    let boundary = processedCards[0].score - step

    for (let i = 0; i < processedCards.length; i++) {
      while (processedCards[i].score < boundary - 1) {
        rows.push([])
        current_row++
        boundary -= step
      }

      rows[current_row].push(
        <SupportCard
          id={processedCards[i].id}
          lb={processedCards[i].lb}
          score={processedCards[i].score}
          key={processedCards[i].id + "LB" + processedCards[i].lb}
          info={processedCards[i].info}
          charName={processedCards[i].char_name}
          selected={selectedNames}
          card={cards.find(
            (c) =>
              c.id === processedCards[i].id &&
              c.limit_break === processedCards[i].lb
          )}
          onClick={() =>
            this.props.cardSelected(
              cards.find(
                (c) =>
                  c.id === processedCards[i].id &&
                  c.limit_break === processedCards[i].lb
              )
            )
          }
          stats={this.state.dropdownSelections}
        />
      )
    }

    let tiers = []
    const tierColorMap = {
      S: "bg-red-600 dark:bg-red-700 text-white font-black",
      A: "bg-orange-500 dark:bg-orange-600 text-white font-black",
      B: "bg-amber-400 dark:bg-amber-500 text-slate-900 font-black",
      C: "bg-green-600 dark:bg-green-700 text-white font-black",
      D: "bg-cyan-500 dark:bg-cyan-600 text-white font-black",
      E: "bg-blue-600 dark:bg-blue-700 text-white font-black",
      F: "bg-purple-600 dark:bg-purple-700 text-white font-black",
    }

    for (let i = 0; i < 7; i++) {
      tiers.push(
        <div
          className="flex border-b border-slate-200 dark:border-zinc-800 last:border-b-0"
          key={tierNames[i]}
        >
          <div
            className={`w-12 flex items-center justify-center text-2xl md:text-3xl select-none ${tierColorMap[tierNames[i]]}`}
          >
            {tierNames[i]}
          </div>
          <div className="flex-1 p-2 bg-slate-50/50 dark:bg-zinc-900/40 flex flex-wrap content-start items-center gap-1 min-h-[100px] md:min-h-[108px]">
            {rows[i]}
          </div>
        </div>
      )
    }

    let count = this.props.selectedCards.filter(
      (c) => c.type == this.props.weights.type
    ).length
    let dropdownOptions = [{ value: "none", label: t.none }]
    let properties = Object.keys(supportCardProperties).sort()
    for (let i = 0; i < properties.length; i++) {
      dropdownOptions.push({
        value: properties[i],
        label: supportCardProperties[properties[i]].friendly_name,
      })
    }

    const valueForDropdown = (key) =>
      dropdownOptions.find((o) => o.value === key) || dropdownOptions[0]

    return (
      <div className="tier-list font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 dark:border-zinc-850 pb-4">
          <div className="text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
              {t.tierListResults}
            </h3>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold block mt-1">
              {t.rankingFor(
                ordinal[count],
                type_names[this.props.weights.type]
              )}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              {t.showStats}
            </span>
            <div className="flex gap-1.5 flex-wrap">
              <Select
                className="text-xs w-32 text-slate-900 dark:text-zinc-900"
                options={dropdownOptions}
                onChange={this.onDropdown1Changed}
                value={valueForDropdown(this.state.dropdownSelections[0])}
              />
              <Select
                className="text-xs w-32 text-slate-900 dark:text-zinc-900"
                options={dropdownOptions}
                onChange={this.onDropdown2Changed}
                value={valueForDropdown(this.state.dropdownSelections[1])}
              />
              <Select
                className="text-xs w-32 text-slate-900 dark:text-zinc-900"
                options={dropdownOptions}
                onChange={this.onDropdown3Changed}
                value={valueForDropdown(this.state.dropdownSelections[2])}
              />
            </div>
          </div>
        </div>

        <div className="border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
          {tiers}
        </div>
      </div>
    )
  }
}

const tierNames = ["S", "A", "B", "C", "D", "E", "F"]

export default TierList

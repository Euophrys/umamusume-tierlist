import React from "react"
import cards from "../cards"
import { lsTest } from "../utils"

class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ssr: [true, false, false, false, false],
      sr: [true, false, false, false, false],
      r: [false, false, false, false, false],
    }

    this.onSettingChanged = this.onSettingChanged.bind(this)

    if (lsTest()) {
      let savedFilters = window.localStorage.getItem("filters")
      if (savedFilters !== null) {
        savedFilters = JSON.parse(savedFilters)
        this.state = savedFilters
      }
    }

    let availableCards = cards.filter((c) => {
      if (c.rarity === 1) {
        return this.state.r[c.limit_break]
      } else if (c.rarity === 2) {
        return this.state.sr[c.limit_break]
      } else {
        return this.state.ssr[c.limit_break]
      }
    })
    this.props.onCardsChanged(availableCards)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState && prevState !== this.state && lsTest()) {
      window.localStorage.setItem("filters", JSON.stringify(this.state))
    }
  }

  onSettingChanged(event, numberString, numberInput) {
    if (!event) return

    let settings = { ...this.state }

    if (event.target.id.indexOf(".") > 0) {
      let split = event.target.id.split(".")
      settings[split[0]][split[1]] = !settings[split[0]][split[1]]
    } else {
      settings[event.target.id] = !settings[event.target.id]
    }

    this.setState(settings)

    let availableCards = cards.filter((c) => {
      if (c.rarity === 1) {
        return this.state.r[c.limit_break]
      } else if (c.rarity === 2) {
        return this.state.sr[c.limit_break]
      } else {
        return this.state.ssr[c.limit_break]
      }
    })
    this.props.onCardsChanged(availableCards)
  }

  onTypeChanged(event) {
    this.setState({
      currentState: event.target.id,
    })

    this.props.onChange(this.state[event.target.id])
  }

  render() {
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
      <div className="filters font-sans">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-zinc-800 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            Card Filters
          </h3>
          <span className="text-xs text-slate-400 dark:text-zinc-500">
            Rarity & Limit Break
          </span>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-center divide-y divide-slate-100 dark:divide-zinc-800">
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Filters

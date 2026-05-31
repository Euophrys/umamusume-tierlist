import React from "react"
import NumericInput from "./NumericInput"
import SpeedIcon from "../icons/utx_ico_obtain_00.png"
import StaminaIcon from "../icons/utx_ico_obtain_01.png"
import PowerIcon from "../icons/utx_ico_obtain_02.png"
import GutsIcon from "../icons/utx_ico_obtain_03.png"
import WisdomIcon from "../icons/utx_ico_obtain_04.png"
import FriendIcon from "../icons/utx_ico_obtain_05.png"
import { lsTest } from "../utils"
import { AppContext } from "../i18n/context"
import { getScenario, getDefaultScenario } from "../scenarios"

class Weights extends React.Component {
  static contextType = AppContext

  constructor(props, context) {
    super(props, context)

    this.onSettingChanged = this.onSettingChanged.bind(this)
    this.onGeneralSettingChanged = this.onGeneralSettingChanged.bind(this)
    this.onTypeChanged = this.onTypeChanged.bind(this)
    this.onCapChanged = this.onCapChanged.bind(this)
    this.onMinimumChanged = this.onMinimumChanged.bind(this)
    this.onToggleWeights = this.onToggleWeights.bind(this)
    this.onMotivationChanged = this.onMotivationChanged.bind(this)
    this.onScenarioReset = this.onScenarioReset.bind(this)

    const defaultState = getDefaultScenario(context.server)

    if (lsTest()) {
      // Weights are persisted per-server because the default-scenario shapes
      // can differ between JP and Global.
      let savedWeights = window.localStorage.getItem(
        "weights." + context.server
      )
      if (savedWeights !== null) {
        savedWeights = JSON.parse(savedWeights)
        if (savedWeights.version == defaultState.version) {
          this.state = savedWeights
          this.props.onChange(
            this.state[this.state.currentState],
            this.state.general
          )
          return
        }
      }
    }

    this.state = defaultState
    this.props.onChange(this.state[this.state.currentState], this.state.general)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState && prevState !== this.state && lsTest()) {
      window.localStorage.setItem(
        "weights." + this.context.server,
        JSON.stringify(this.state)
      )
    }
  }

  onScenarioReset(scenarioKey) {
    let newState = getScenario(this.context.server, scenarioKey)
    this.setState(newState)
    this.props.onChange(newState[newState.currentState], newState.general)
  }

  onSettingChanged(event, numberString, numberInput) {
    if (!event) return

    let settings = this.state[this.state.currentState]

    if (typeof event === "number") {
      if (numberInput.id.indexOf(".") > 0) {
        let split = numberInput.id.split(".")
        settings[split[0]][split[1]] = event
      } else {
        settings[numberInput.id] = event
      }
    } else {
      settings[event.target.id] = !settings[event.target.id]
    }

    let newSettings = {}
    newSettings[this.state.currentState] = settings
    this.setState(newSettings)

    this.props.onChange(settings, this.state.general)
  }

  onGeneralSettingChanged(event, numberString, numberInput) {
    if (!event) return

    let settings = this.state.general

    if (typeof event === "number") {
      if (numberInput.id.indexOf(".") > 0) {
        let split = numberInput.id.split(".")
        settings[split[0]][split[1]] = event
      } else {
        settings[numberInput.id] = event
      }
    } else {
      settings[event.target.id] = !settings[event.target.id]
    }

    let newSettings = {}
    newSettings.general = settings
    this.setState(newSettings)

    this.props.onChange(this.state[this.state.currentState], settings)
  }

  onMotivationChanged(event) {
    let settings = this.state.general
    settings.motivation = event.target.value
    let newSettings = {}
    newSettings.general = settings
    this.setState(newSettings)
    this.props.onChange(this.state[this.state.currentState], settings)
  }

  onTypeChanged(event) {
    this.setState({
      currentState: event.target.id,
    })

    this.props.onChange(this.state[event.target.id], this.state.general)
  }

  onCapChanged(event) {
    let settings = this.state[this.state.currentState]
    settings.cap = event.target.value
    let newSettings = {}
    newSettings[this.state.currentState] = settings
    this.setState(newSettings)
    this.props.onChange(settings, this.state.general)
  }

  onMinimumChanged(event) {
    let settings = this.state[this.state.currentState]
    settings.minimum = event.target.value
    let newSettings = {}
    newSettings[this.state.currentState] = settings
    this.setState(newSettings)
    this.props.onChange(settings, this.state.general)
  }

  onToggleWeights() {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { t, serverConfig } = this.context

    // Scenario preset buttons come from the active server's available scenario
    // list, with labels translated through the active locale.
    const resetScenarios = serverConfig.availableScenarios.map((key) => ({
      id: "reset-weights-" + key,
      key,
      label: t.scenarioLabels[key] || key,
      handler: () => this.onScenarioReset(key),
    }))

    return (
      <div className="weights font-sans text-left">
        {/* Type Tab Selector Row */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-zinc-850 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            {t.selectStatType}
          </h3>
        </div>

        <div className="grid grid-cols-6 gap-1.5 mb-5">
          {["speed", "stamina", "power", "guts", "wisdom", "friend"].map(
            (type, idx) => {
              const icons = [
                SpeedIcon,
                StaminaIcon,
                PowerIcon,
                GutsIcon,
                WisdomIcon,
                FriendIcon,
              ]
              const label = t[type]
              const isActive = this.state.currentState === type
              return (
                <button
                  key={type}
                  id={type}
                  type="button"
                  onClick={this.onTypeChanged}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center  ${isActive
                    ? "bg-slate-100 dark:bg-zinc-800 border-blue-500 text-blue-600 dark:text-blue-400 font-bold"
                    : "bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-850 text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-905"
                    }`}
                >
                  <img
                    src={icons[idx]}
                    className="w-8 h-8 object-contain pointer-events-none"
                    alt={label}
                  />
                  <span className="text-[10px] mt-1.5 font-semibold pointer-events-none">
                    {label}
                  </span>
                </button>
              )
            }
          )}
        </div>

        <div className="mb-4">
          <button
            id="weights-toggle"
            type="button"
            onClick={this.onToggleWeights}
            className="w-full text-center py-2 border border-slate-300 dark:border-zinc-700 rounded-lg text-xs font-bold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850  shadow-sm focus:outline-none"
          >
            {this.state.show ? t.hideSettings : t.customizeSettings}
          </button>
        </div>

        {this.state.show && (
          <div className="space-y-5">
            {/* Scenario reset card */}
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1">
                {t.scenarioPresets}
              </h4>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 mb-3 leading-relaxed">
                {t.scenarioPresetsHelp}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {resetScenarios.map((scen) => (
                  <button
                    key={scen.key}
                    id={scen.id}
                    type="button"
                    onClick={scen.handler}
                    className="px-3 py-1 border border-slate-300 dark:border-zinc-800 rounded-full text-xs font-semibold bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-850  cursor-pointer"
                  >
                    {scen.label}
                  </button>
                ))}
              </div>
            </div>

            {/* General controls section */}
            <div className="space-y-4">
              {/* Bond Rate */}
              <div className="p-3.5 border border-slate-200 dark:border-zinc-850 rounded-xl flex items-center justify-between">
                <div className="mr-4 flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                    {t.bondRate}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-normal mt-0.5">
                    {t.bondRateHelp}
                  </p>
                </div>
                <NumericInput
                  onChange={this.onGeneralSettingChanged}
                  id="bondPerDay"
                  value={this.state.general.bondPerDay}
                  min={1}
                  max={50}
                  step={0.1}
                />
              </div>

              {/* Optional Races */}
              <div className="p-3.5 border border-slate-200 dark:border-zinc-850 rounded-xl space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                    {t.optionalRaces}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-normal mt-0.5">
                    {t.optionalRacesHelp}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                      G1
                    </span>
                    <NumericInput
                      onChange={this.onGeneralSettingChanged}
                      id="races.0"
                      value={this.state.general.races[0]}
                      min={0}
                      max={30}
                      step={1}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                      G2/G3
                    </span>
                    <NumericInput
                      onChange={this.onGeneralSettingChanged}
                      id="races.1"
                      value={this.state.general.races[1]}
                      min={0}
                      max={30}
                      step={1}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                      OP
                    </span>
                    <NumericInput
                      onChange={this.onGeneralSettingChanged}
                      id="races.2"
                      value={this.state.general.races[2]}
                      min={0}
                      max={30}
                      step={1}
                    />
                  </div>
                </div>
              </div>

              {/* Scenario Specific */}
              <div className="p-3.5 border border-slate-200 dark:border-zinc-850 rounded-xl space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                    {t.scenarioModifiers}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-normal mt-0.5">
                    {t.scenarioModifiersHelp}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                      {t.multiplier}
                    </span>
                    <NumericInput
                      onChange={this.onGeneralSettingChanged}
                      id="multi"
                      value={this.state.general.multi}
                      min={1}
                      max={2.2}
                      step={0.05}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                      {t.specBonus}
                    </span>
                    <NumericInput
                      onChange={this.onGeneralSettingChanged}
                      id="bonusSpec"
                      value={this.state.general.bonusSpec}
                      min={-1}
                      max={95}
                      step={5}
                    />
                  </div>
                </div>
              </div>

              {/* Stat Weights */}
              <div className="p-3.5 border border-slate-200 dark:border-zinc-850 rounded-xl space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                    {t.statWeights}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-normal mt-0.5">
                    {t.statWeightsHelp}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 0, label: t.speed },
                    { key: 1, label: t.stamina },
                    { key: 2, label: t.power },
                    { key: 3, label: t.guts },
                    { key: 4, label: t.wisdom },
                    { key: 5, label: t.skillPts },
                    { key: 6, label: t.energy },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex flex-col space-y-1">
                      <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                        {label}
                      </span>
                      <NumericInput
                        onChange={this.onSettingChanged}
                        id={"stats." + key}
                        value={this.state[this.state.currentState].stats[key]}
                        min={0}
                        max={3}
                        step={0.1}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sliders & Caps */}
              <div className="p-3.5 border border-slate-200 dark:border-zinc-850 rounded-xl space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                      {t.motivation}
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                      {this.state.general.motivation * 100}%
                    </span>
                  </div>
                  <input
                    type="range"
                    onChange={this.onMotivationChanged}
                    min={-0.2}
                    max={0.2}
                    step={0.05}
                    value={this.state.general.motivation}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-850">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                      {t.statCap}
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                      {this.state[this.state.currentState].cap}
                    </span>
                  </div>
                  <input
                    type="range"
                    onChange={this.onCapChanged}
                    min={300}
                    max={1000}
                    step={20}
                    value={this.state[this.state.currentState].cap}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-850">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                      {t.minTrainScore}
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                      {this.state[this.state.currentState].minimum}
                    </span>
                  </div>
                  <input
                    type="range"
                    onChange={this.onMinimumChanged}
                    min={20}
                    max={100}
                    step={5}
                    value={this.state[this.state.currentState].minimum}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
              </div>

              {/* Rainbow Alterations */}
              {this.state.currentState !== "friend" && (
                <div className="p-3.5 border border-slate-200 dark:border-zinc-850 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                    {t.rainbowAlterations}
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        onChange={this.onSettingChanged}
                        checked={this.state[this.state.currentState].prioritize}
                        id="prioritize"
                        className="h-4 w-4 text-blue-600 border-slate-300 dark:border-zinc-700 rounded focus:ring-blue-500 dark:bg-zinc-950 cursor-pointer mt-0.5"
                      />
                      <div className="ml-2.5 text-slate-500 dark:text-zinc-400">
                        <label
                          htmlFor="prioritize"
                          className="font-semibold text-slate-700 dark:text-zinc-300 block cursor-pointer"
                        >
                          {t.prioritizeStat}
                        </label>
                        <span className="text-[10px] block leading-normal mt-0.5">
                          {t.prioritizeStatHelp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start pt-2.5 border-t border-slate-100 dark:border-zinc-850">
                      <input
                        type="checkbox"
                        onChange={this.onSettingChanged}
                        checked={this.state[this.state.currentState].onlySummer}
                        id="onlySummer"
                        className="h-4 w-4 text-blue-600 border-slate-300 dark:border-zinc-700 rounded focus:ring-blue-500 dark:bg-zinc-950 cursor-pointer mt-0.5"
                      />
                      <div className="ml-2.5 text-slate-500 dark:text-zinc-400">
                        <label
                          htmlFor="onlySummer"
                          className="font-semibold text-slate-700 dark:text-zinc-300 block cursor-pointer"
                        >
                          {t.onlySummer}
                        </label>
                        <span className="text-[10px] block leading-normal mt-0.5">
                          {t.onlySummerHelp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Uma's Bonuses */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1">
            {t.umaBonuses}
          </h4>
          <p className="text-[10px] text-slate-400 dark:text-zinc-500 mb-3 leading-relaxed">
            {t.umaBonusesHelp}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {[
              { key: 0, label: t.speed },
              { key: 1, label: t.stamina },
              { key: 2, label: t.power },
              { key: 3, label: t.guts },
              { key: 4, label: t.wisdom },
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col space-y-1">
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                  {label}
                </span>
                <NumericInput
                  onChange={this.onGeneralSettingChanged}
                  id={"umaBonus." + key}
                  value={this.state.general.umaBonus[key]}
                  min={0.7}
                  max={1.3}
                  step={0.01}
                  precision={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Weights

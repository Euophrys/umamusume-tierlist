import React from "react"
import { useApp } from "../i18n/context"

function SupportCard(props) {
  const { t, serverConfig } = useApp()

  let lit_up = ""
  let dark = ""

  for (let i = 0; i < 4; i++) {
    if (i < props.lb) {
      lit_up += "◆"
    } else {
      dark += "◆"
    }
  }

  let statDisplays = ["", "", ""]

  for (let i = 0; i < 3; i++) {
    let stat = props.stats[i]
    if (stat == "none") continue
    let value = props.card[stat]
    if (stat == "fs_bonus") {
      // The JP cards.js stores unique_fs_bonus in a different format than the
      // Global cards.js, so the per-server flag picks the matching formula.
      if (serverConfig.useLegacyFsBonusDisplay) {
        value *= (value + 100) * props.card["unique_fs_bonus"] - 100
      } else {
        value *= props.card["unique_fs_bonus"]
      }
    } else if (stat == "specialty_rate") {
      value =
        (value + 100) *
          props.card["unique_specialty"] *
          props.card["fs_specialty"] -
        100
    }
    if (value < 1) {
      value *= 100
    } else if (value < 2 && stat != "race_bonus") {
      value -= 1
      value *= 100
    }
    value = Math.round(value)
    statDisplays[i] = `${value}${t.supportCardProperties[stat].shorthand}`
  }

  const alreadySelected = props.selected.indexOf(props.charName) > -1

  return (
    <div className="relative inline-block w-20 h-20 md:w-[96px] md:h-[96px] select-none align-middle font-sans">
      <img
        className={`w-full h-full object-contain  duration-100 ${alreadySelected ? "grayscale opacity-40 cursor-not-allowed" : "cursor-pointer active:scale-95"}`}
        name={props.id}
        src={"./cardImages/support_card_s_" + props.id + ".png"}
        title={props.charName}
        alt={props.charName}
        onClick={alreadySelected ? () => {} : props.onClick}
      />
      <span
        className="absolute bottom-1.5 left-0 w-full text-center text-[10px] md:text-xs font-mono select-none pointer-events-none"
        style={{
          textShadow:
            "-1px -1px 0 #f5f0eb, 1px -1px 0 #f5f0eb, -1px 1px 0 #f5f0eb, 1px 1px 0 #f5f0eb",
        }}
      >
        <span className="text-cyan-600 dark:text-cyan-500 font-bold">
          {lit_up}
        </span>
        <span className="text-slate-400 dark:text-zinc-500">{dark}</span>
      </span>
      <span
        className="absolute top-1 right-2 text-right text-[10px] md:text-xs font-bold text-greenyellow font-mono select-none pointer-events-none"
        style={{
          color: "#adff2f",
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
        onClick={() => console.log(props.info)}
      >
        {Math.round(props.score)}
      </span>
      {statDisplays[0] && (
        <span
          className="absolute top-4 md:top-5 right-2 text-right text-[9px] md:text-[10px] text-yellow-300 font-bold font-mono select-none pointer-events-none"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {statDisplays[0]}
        </span>
      )}
      {statDisplays[1] && (
        <span
          className="absolute top-7 md:top-8 right-2 text-right text-[9px] md:text-[10px] text-yellow-300 font-bold font-mono select-none pointer-events-none"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #005",
          }}
        >
          {statDisplays[1]}
        </span>
      )}
      {statDisplays[2] && (
        <span
          className="absolute top-10 md:top-11 right-2 text-right text-[9px] md:text-[10px] text-yellow-300 font-bold font-mono select-none pointer-events-none"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {statDisplays[2]}
        </span>
      )}
    </div>
  )
}

export default SupportCard

import React from "react";
import SpeedIcon from "../../icons/utx_ico_obtain_00.png";
import StaminaIcon from "../../icons/utx_ico_obtain_01.png";
import PowerIcon from "../../icons/utx_ico_obtain_02.png";
import GutsIcon from "../../icons/utx_ico_obtain_03.png";
import WisdomIcon from "../../icons/utx_ico_obtain_04.png";
import FriendIcon from "../../icons/utx_ico_obtain_05.png";
import events from "../../card-events";
const raceRewards = [10, 8, 5];

const type_to_icon = [
  SpeedIcon,
  StaminaIcon,
  PowerIcon,
  GutsIcon,
  WisdomIcon,
  "",
  FriendIcon,
];

function SelectedCards(props) {
  let cards = [];
  let raceBonus = 0;
  let statsNoTraining = [120, 120, 120, 120, 120];

  for (let i = 0; i < props.selectedCards.length; i++) {
    let lit_up = "";
    let dark = "";
    let card = props.selectedCards[i];
    raceBonus += card.race_bonus;

    for (let j = 0; j < 4; j++) {
      if (j < card.limit_break) {
        lit_up += "◆";
      } else {
        dark += "◆";
      }
    }

    for (let stat = 0; stat < 5; stat++) {
      if (events[card.id]) {
        statsNoTraining[stat] += events[card.id][stat] * card.effect_size_up;
      }
      statsNoTraining[stat] += card.starting_stats[stat];
    }

    cards.push(
      <div className="support-card" key={"selected-" + i}>
        <img
          className="support-card-image"
          name={card.id}
          src={"./cardImages/support_card_s_" + card.id + ".png"}
          title={card.id}
          alt={card.id}
          onClick={() => props.onClick(card)}
        />
        <img
          className="type-icon"
          name="type icon"
          src={type_to_icon[card.type]}
          title="type"
          alt="card type"
          onClick={() => props.onClick(card)}
        />
        <span className="limit-breaks">
          <span className="lb-yes">{lit_up}</span>
          <span className="lb-no">{dark}</span>
        </span>
      </div>,
    );
  }

  let raceMultiplier = 1 + raceBonus / 100;
  for (let i = 0; i < 3; i++) {
    let raceGain = Math.floor(raceRewards[i] * raceMultiplier);
    raceGain = raceGain * props.weights.races[i];
    for (let stat = 0; stat < 5; stat++) {
      statsNoTraining[stat] += raceGain / 5;
    }
  }

  for (let stat = 0; stat < 5; stat++) {
    statsNoTraining[stat] += Math.floor(13.5 * raceMultiplier) * 3;
    statsNoTraining[stat] = Math.round(statsNoTraining[stat]);
  }

  return (
    <div className="selected-cards font-sans text-left">
      <div className="flex items-center justify-between mb-2 border-b border-slate-100 dark:border-zinc-800 pb-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
          Support Deck
        </h3>
        <span className="text-xs text-slate-400 dark:text-zinc-500">
          {props.selectedCards.length} / 6 Cards
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4 italic leading-relaxed">
        Click a card below to remove it, or click a card in the tier list to add
        it. The tier list score is for adding the card to this deck.
      </p>

      <div className="flex flex-wrap gap-2 justify-start mb-4">{cards}</div>

      <div className="mt-3 p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-lg space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 dark:text-zinc-400 font-medium">
            Total Race Bonus:
          </span>
          <span className="text-slate-900 dark:text-white font-bold text-sm bg-slate-200 dark:bg-zinc-800 px-2 py-0.5 rounded">
            {raceBonus}%
          </span>
        </div>
        <div className="text-[10px] text-slate-400 dark:text-zinc-500 leading-tight">
          Aim for{" "}
          <span className="font-semibold text-slate-600 dark:text-zinc-400">
            35%
          </span>{" "}
          (URA/Unity) or{" "}
          <span className="font-semibold text-slate-600 dark:text-zinc-400">
            50%
          </span>{" "}
          (TB).
        </div>
      </div>

      <div className="mt-4">
        <a
          href={getEventHelperURL(props.selectedCards)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-md text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850  shadow-sm"
        >
          Open in Gametora Event Helper ↗
        </a>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
          Presets
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            className="px-3 py-1 border border-slate-200 dark:border-zinc-800 rounded-full text-xs font-semibold bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800  cursor-pointer"
            onClick={() =>
              props.onLoadPreset([30028, 20023, 20020, 20009, 20003])
            }
          >
            Speed/Power
          </button>
          <button
            className="px-3 py-1 border border-slate-200 dark:border-zinc-800 rounded-full text-xs font-semibold bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-850  cursor-pointer"
            onClick={() =>
              props.onLoadPreset([30028, 20023, 20020, 20008, 30022])
            }
          >
            Speed/Stamina
          </button>
          <button
            className="px-3 py-1 border border-slate-200 dark:border-zinc-800 rounded-full text-xs font-semibold bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-850  cursor-pointer"
            onClick={() =>
              props.onLoadPreset([30028, 20023, 20020, 20012, 20002])
            }
          >
            Speed/Wit
          </button>
          <button
            className="px-3 py-1 border border-slate-200 dark:border-zinc-800 rounded-full text-xs font-semibold bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-850  cursor-pointer"
            onClick={() =>
              props.onLoadPreset([30011, 30030, 30019, 20012, 20002])
            }
          >
            Guts/Wit
          </button>
        </div>
      </div>
    </div>
  );
}

function getEventHelperURL(selectedCards) {
  let url = "https://gametora.com/umamusume/training-event-helper?deck=mp4y-";

  let ids = selectedCards.map((c) => c.id);
  while (ids.length < 6) ids.push(10000);

  url += parseInt(`${ids[0]}${ids[1]}${ids[2]}`, 10).toString(36);
  url += "-";
  url += parseInt(`${ids[3]}${ids[4]}${ids[5]}`, 10).toString(36);

  return url;
}

export default SelectedCards;

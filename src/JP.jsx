import "./JP.css";
import cards from "./cards";
import TierList from "./components/TierList";
import Weights from "./components/Weights";
import SelectedCards from "./components/SelectedCards";
import Filters from "./components/Filters";
import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./components/DarkModeButton";

const ordinal = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];
const type_names = [
  "Speed",
  "Stamina",
  "Power",
  "Guts",
  "Wisdom",
  "",
  "Friend",
];

class JP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weights: {
        type: 0,
        bondPerDay: 3.5,
        trainingDays: 50,
        races: [10, 10, 5, 3],
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
          [11, 0, 5, 0, 0, 2, 22],
          [0, 9, 0, 6, 0, 2, 21],
          [0, 4, 10, 0, 0, 2, 21],
          [3, 0, 2, 10, 0, 2, 24],
          [3, 0, 0, 0, 9, 3, 0],
        ],
        umaBonus: [1, 1, 1, 1, 1, 1],
        stats: [1, 1, 1.1, 1, 1, 0.5, 1.5],
        multi: 1,
        bonusFS: 0,
        bonusSpec: 0,
        motivation: 0.2,
        scenarioLink: [],
        scenarioBonus: 0,
        fanBonus: 0.05,
        prioritize: true,
        onlySummer: false,
      },
      selectedCards: [
        cards.find((c) => c.id === 30226 && c.limit_break === 4),
        cards.find((c) => c.id === 30256 && c.limit_break === 4),
        cards.find((c) => c.id === 30187 && c.limit_break === 4),
        cards.find((c) => c.id === 30233 && c.limit_break === 4),
        cards.find((c) => c.id === 30257 && c.limit_break === 4),
      ],
      availableCards: cards,
      label: "Ranking for the 2nd Speed card in this deck:",
    };

    this.onWeightsChanged = this.onWeightsChanged.bind(this);
    this.onCardSelected = this.onCardSelected.bind(this);
    this.onCardRemoved = this.onCardRemoved.bind(this);
    this.onCardsChanged = this.onCardsChanged.bind(this);
    this.onLoadPreset = this.onLoadPreset.bind(this);
  }

  onWeightsChanged(statWeights, generalWeights) {
    let combinedWeights = { ...statWeights, ...generalWeights };
    this.setState({ weights: combinedWeights });
  }

  onCardSelected(card) {
    if (this.state.selectedCards.length > 5) return;
    let cards = this.state.selectedCards.slice();
    let index = this.state.selectedCards.findIndex((c) => c.id === card.id);

    if (index > -1) {
      cards[index] = card;
    } else {
      cards.push(card);
    }

    this.setState({ selectedCards: cards });
  }

  onCardRemoved(card) {
    if (this.state.selectedCards.length === 1) return;
    let cards = this.state.selectedCards.slice();
    let cardIndex = cards.findIndex((c) => c.id === card.id);
    cards.splice(cardIndex, 1);
    this.setState({ selectedCards: cards });
  }

  onCardsChanged(cards) {
    this.setState({ availableCards: cards });
  }

  onLoadPreset(presetCards) {
    let selectedCards = [];
    for (let i = 0; i < presetCards.length; i++) {
      selectedCards.push(
        cards.find((c) => c.id === presetCards[i] && c.limit_break === 4),
      );
    }
    this.setState({ selectedCards: selectedCards });
  }

  render() {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans pb-12">
        <DarkModeToggle />

        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 border-b border-slate-200 dark:border-zinc-800">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Uma Musume Support Card Tier List
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
                This tier list defaults to the DYI Scenario and doesn't consider
                skills, only stats.
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
              <a
                href="https://docs.google.com/document/d/1gNcV7XLmxx0OI2DEAR8gmKb8P9BBhcwGhlJOVbYaXeo/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-md text-sm font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800  focus:outline-none"
              >
                Reference Document
              </a>
              <Link
                to="global"
                className="inline-flex items-center px-4 py-2 border border-blue-600 dark:border-blue-500 rounded-md text-sm font-medium text-white bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700  focus:outline-none"
              >
                Switch to Global
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto px-4 mt-2 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-[36rem_minmax(0,1fr)] gap-4 items-start">
            {/* Settings & Controls Panel */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                <Weights onChange={this.onWeightsChanged} />
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                <SelectedCards
                  selectedCards={this.state.selectedCards}
                  onClick={this.onCardRemoved}
                  onLoadPreset={this.onLoadPreset}
                  weights={this.state.weights}
                />
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                <Filters onCardsChanged={this.onCardsChanged} />
              </div>
            </div>

            {/* Tier List Results Panel (Takes full width remaining) */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
              <TierList
                cards={this.state.availableCards}
                weights={this.state.weights}
                selectedCards={this.state.selectedCards}
                cardSelected={this.onCardSelected}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default JP;

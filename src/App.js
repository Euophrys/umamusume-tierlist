import './App.css';
import cards from './cards';
import TierList from './components/TierList';
import Weights from './components/Weights';
import SelectedCards from './components/SelectedCards';
import Filters from './components/Filters';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weights: {
                type: 0,
                bondPerDay: 3.5,
                trainingDays: 50,
                trainingImportance: [1,0.2,0.3,0.1,0.3],
                trainingGain: [
                    [10,0,4,0,0,2,21],
                    [0,9,0,3,0,2,19],
                    [0,4,8,0,0,2,20],
                    [3,0,3,8,0,2,22],
                    [2,0,0,0,8,3,0]
                ],
                umaBonus: [1,1,1,1,1,1],
                stats: [1,1,1,0.75,1,0.5,1.5],
                supportPenalty: 180
            },
            selectedCards: [
                cards.find((c) => c.id === 30028 && c.limit_break === 4),
                cards.find((c) => c.id === 20023 && c.limit_break === 4),
                cards.find((c) => c.id === 20031 && c.limit_break === 4),
                cards.find((c) => c.id === 20024 && c.limit_break === 4),
                cards.find((c) => c.id === 20003 && c.limit_break === 4),
            ],
            availableCards: cards
        }

        this.onWeightsChanged = this.onWeightsChanged.bind(this);
        this.onCardSelected = this.onCardSelected.bind(this);
        this.onCardRemoved = this.onCardRemoved.bind(this);
        this.onCardsChanged = this.onCardsChanged.bind(this);
        this.onLoadPreset = this.onLoadPreset.bind(this);
    }

    onWeightsChanged(weights) {
        this.setState({weights: weights});
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

        this.setState({selectedCards:cards});
    }

    onCardRemoved(card) {
        if (this.state.selectedCards.length === 1) return;
        let cards = this.state.selectedCards.slice();
        let cardIndex = cards.findIndex((c) => c.id === card.id);
        cards.splice(cardIndex, 1);
        this.setState({selectedCards:cards});
    }

    onCardsChanged(cards) {
        this.setState({availableCards: cards});
    }

    onLoadPreset(presetCards) {
        let selectedCards = [];
        for(let i = 0; i < presetCards.length; i++) {
            selectedCards.push(cards.find((c) => c.id === presetCards[i] && c.limit_break === 4));
        }
        this.setState({selectedCards:selectedCards});
    }

    render() {
        return (
            <div className="App">
                <h1>Uma Musume Support Card Tier List</h1>
                <span class="section-explanation">
                    Created by Erzzy from the UmaMusume EN Discord<br/>
                    For more game information, check the <a href="https://docs.google.com/document/d/1gNcV7XLmxx0OI2DEAR8gmKb8P9BBhcwGhlJOVbYaXeo/edit?usp=sharing">Uma Musume Reference</a><br/>
                </span>
                <Weights
                    onChange={this.onWeightsChanged}
                    />
                <SelectedCards
                    selectedCards={this.state.selectedCards}
                    onClick={this.onCardRemoved}
                    onLoadPreset={this.onLoadPreset}
                    />
                <Filters
                    onCardsChanged={this.onCardsChanged}
                    />
                <TierList 
                    cards={this.state.availableCards}
                    weights={this.state.weights}
                    selectedCards={this.state.selectedCards}
                    cardSelected={this.onCardSelected}
                />
            </div>
        );
    }
}

export default App;

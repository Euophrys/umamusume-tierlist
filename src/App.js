import './App.css';
import cards from './cards';
import TierList from './components/TierList';
import Weights from './components/Weights';
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
            }
        }

        this.onWeightsChanged = this.onWeightsChanged.bind(this);
    }

    onWeightsChanged(weights) {
        this.setState({weights: weights});
    }

    render() {
        return (
            <div className="App">
                <Weights
                    onChange={this.onWeightsChanged}
                />
                <TierList 
                    cards={cards}
                    weights={this.state.weights}
                />
            </div>
        );
    }
}

export default App;

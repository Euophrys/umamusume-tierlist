import React from 'react';
import NumericInput from 'react-numeric-input';

class Weights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: "speed",
            speed: {
                type: 0,
                bondPerDay: 3.5,
                trainingDays: 50,
                trainingImportance: [1,0.1,0.36,0.05,0.2],
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
            stamina: {
                type: 1,
                bondPerDay: 3.5,
                trainingDays: 50,
                trainingImportance: [0.5,1,0.1,0.05,0.2],
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
            power: {
                type: 2,
                bondPerDay: 3.5,
                trainingDays: 50,
                trainingImportance: [0.5,0.1,1,0.05,0.2],
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
            guts: {
                type: 3,
                bondPerDay: 3.5,
                trainingDays: 50,
                trainingImportance: [0.2,0.1,0.1,1,0.4],
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
            wisdom: {
                type: 4,
                bondPerDay: 3.5,
                trainingDays: 50,
                trainingImportance: [0.5,0.1,0.1,0.05,1],
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
            friend: {
                type: 6,
                bondPerDay: 3.5,
                trainingDays: 50,
                trainingImportance: [0.5,0.1,0.2,0.05,0.2],
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
        };

        this.onSettingChanged = this.onSettingChanged.bind(this);
        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.props.onChange(this.state.speed);
    }

    onSettingChanged(event, numberString, numberInput) {
        if (!event) return;

        let settings = this.state[this.state.currentState];

        if (typeof event === "number") {
            if (numberInput.id.indexOf('.') > 0) {
                let split = numberInput.id.split('.');
                settings[split[0]][split[1]] = event;
            } else {
                settings[numberInput.id] = event;
            }
        }
        else {
            settings[event.target.id] = !settings[event.target.id];
        }

        let newSettings = {};
        newSettings[this.state.currentState] = settings;
        this.setState(newSettings);

        this.props.onChange(settings);
    }

    onTypeChanged(event) {
        this.setState({
            currentState: event.target.id
        });

        this.props.onChange(this.state[event.target.id]);
    }

    render() {
        return (
            <div className="weights">
                <div className="weight-row">
                    <button id="speed" type="button" onClick={this.onTypeChanged}>Speed</button>
                    <button id="stamina" type="button" onClick={this.onTypeChanged}>Stamina</button>
                    <button id="power" type="button" onClick={this.onTypeChanged}>Power</button>
                    <button id="guts" type="button" onClick={this.onTypeChanged}>Guts</button>
                    <button id="wisdom" type="button" onClick={this.onTypeChanged}>Wisdom</button>
                    <button id="friend" type="button" onClick={this.onTypeChanged}>Friends</button>
                </div>
                <div className="weight-row">
                    <div class="section-header">Time Controls</div>
                    <div class="section-explanation">
                        Training days should be roughly (Total Days - Races Done - Number of Rests)<br/>
                        The fewer bond and days, the more Starting Bond matters.
                    </div>
                    <label for="bondPerDay">Bond Gained per Day:</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="bondPerDay" value={this.state[this.state.currentState].bondPerDay} min={1} max={9} step={0.25}/>
                    <label for="trainingDays">Available Training Days:</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="trainingDays" value={this.state[this.state.currentState].trainingDays} min={30} max={70} step={1}/>
                </div>
                <div className="weight-row">
                    <div class="section-header">Training Importance</div>
                    <div class="section-explanation">
                        Basically, how likely you are to click the training when the card lands on it.<br/>
                        Rough rainbow chance: 0.2 with 1 card, 0.36 with 2 cards, 0.5 with 3 cards<br/>
                        The higher the total value here, the more Training Bonus and Motivation Bonus matters.
                    </div>
                    <label for="trainingImportance.0">Speed</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="trainingImportance.0" value={this.state[this.state.currentState].trainingImportance[0]} min={0} max={1} step={0.01}/>
                    <label for="trainingImportance.1">Stamina</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="trainingImportance.1" value={this.state[this.state.currentState].trainingImportance[1]} min={0} max={1} step={0.01}/>
                    <label for="trainingImportance.2">Power</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="trainingImportance.2" value={this.state[this.state.currentState].trainingImportance[2]} min={0} max={1} step={0.01}/>
                    <label for="trainingImportance.3">Guts</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="trainingImportance.3" value={this.state[this.state.currentState].trainingImportance[3]} min={0} max={1} step={0.01}/>
                    <label for="trainingImportance.4">Wisdom</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="trainingImportance.4" value={this.state[this.state.currentState].trainingImportance[4]} min={0} max={1} step={0.01}/>
                </div>
                <div className="weight-row">
                    <div class="section-header">Stat Weights</div>
                    <div class="section-explanation">
                        How much score each point of the given stat/resource gives.
                    </div>
                    <label for="stats.0">Speed</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="stats.0" value={this.state[this.state.currentState].stats[0]} min={0} max={3} step={0.1}/>
                    <label for="stats.1">Stamina</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="stats.1" value={this.state[this.state.currentState].stats[1]} min={0} max={3} step={0.1}/>
                    <label for="stats.2">Power</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="stats.2" value={this.state[this.state.currentState].stats[2]} min={0} max={3} step={0.1}/>
                    <label for="stats.3">Guts</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="stats.3" value={this.state[this.state.currentState].stats[3]} min={0} max={3} step={0.1}/>
                    <label for="stats.4">Wisdom</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="stats.4" value={this.state[this.state.currentState].stats[4]} min={0} max={3} step={0.1}/>
                    <label for="stats.5">Skill Points</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="stats.5" value={this.state[this.state.currentState].stats[5]} min={0} max={3} step={0.1}/>
                    <label for="stats.6">Energy</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="stats.6" value={this.state[this.state.currentState].stats[6]} min={0} max={3} step={0.1}/>
                </div>
                <div className="weight-row">
                    <div class="section-header">Uma's Bonuses</div>
                    <div class="section-explanation">The percentages on the uma's stat screen.</div>
                    <label for="umaBonus.0">Speed</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.0" value={this.state[this.state.currentState].umaBonus[0]} min={1} max={1.3} step={0.05}/>
                    <label for="umaBonus.1">Stamina</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.1" value={this.state[this.state.currentState].umaBonus[1]} min={1} max={1.3} step={0.05}/>
                    <label for="umaBonus.2">Power</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.2" value={this.state[this.state.currentState].umaBonus[2]} min={1} max={1.3} step={0.05}/>
                    <label for="umaBonus.3">Guts</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.3" value={this.state[this.state.currentState].umaBonus[3]} min={1} max={1.3} step={0.05}/>
                    <label for="umaBonus.4">Wisdom</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.4" value={this.state[this.state.currentState].umaBonus[4]} min={1} max={1.3} step={0.05}/>
                </div>
                {
                    this.state.currentState == "friend" && 
                    <div className="weight-row">
                        <div class="section-header">Date Penalty</div>
                        <div class="section-explanation">
                            How much Energy doing the Support Card's dates costs you (e.g. if you do them instead of a rest)<br/>
                            A rest is on average around 40-50 Energy, but you sometimes date to raise mood.
                        </div>
                        <label for="supportPenalty">Energy Cost of 5 Dates:</label>
                        <NumericInput onChange={this.onSettingChanged} type="number" id="supportPenalty" value={this.state[this.state.currentState].supportPenalty} min={0} max={350} step={5}/>
                    </div>
                }
            </div>
        );
    }
}

export default Weights;
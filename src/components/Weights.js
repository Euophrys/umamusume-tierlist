import React from 'react';
import NumericInput from 'react-numeric-input';
import SpeedIcon from '../icons/utx_ico_obtain_00.png';
import StaminaIcon from '../icons/utx_ico_obtain_01.png';
import PowerIcon from '../icons/utx_ico_obtain_02.png';
import GutsIcon from '../icons/utx_ico_obtain_03.png';
import WisdomIcon from '../icons/utx_ico_obtain_04.png';
import FriendIcon from '../icons/utx_ico_obtain_05.png';

class Weights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: "speed",
            show: false,
            speed: {
                type: 0,
                bondPerDay: 2.5,
                trainingDays: 50,
                trainingGain: [
                    [10,0,4,0,0,2,21],
                    [0,9,0,3,0,2,19],
                    [0,4,8,0,0,2,20],
                    [3,0,3,8,0,2,22],
                    [2,0,0,0,8,3,0]
                ],
                umaBonus: [1,1,1,1,1,1],
                stats: [1,1,1.1,0.7,1,0.5,1.5],
                cap:500,
                importance: 0.8
            },
            stamina: {
                type: 1,
                bondPerDay: 2.5,
                trainingDays: 50,
                trainingGain: [
                    [10,0,4,0,0,2,21],
                    [0,9,0,3,0,2,19],
                    [0,4,8,0,0,2,20],
                    [3,0,3,8,0,2,22],
                    [2,0,0,0,8,3,0]
                ],
                umaBonus: [1,1,1,1,1,1],
                stats: [1,1,1,0.8,1,0.5,1.5],
                cap:500,
                importance: 0.66
            },
            power: {
                type: 2,
                bondPerDay: 2.5,
                trainingDays: 50,
                trainingGain: [
                    [10,0,4,0,0,2,21],
                    [0,9,0,3,0,2,19],
                    [0,4,8,0,0,2,20],
                    [3,0,3,8,0,2,22],
                    [2,0,0,0,8,3,0]
                ],
                umaBonus: [1,1,1,1,1,1],
                stats: [1,1.1,1,0.7,1,0.5,1.5],
                cap:500,
                importance: 0.66
            },
            guts: {
                type: 3,
                bondPerDay: 2.5,
                trainingDays: 50,
                trainingGain: [
                    [10,0,4,0,0,2,21],
                    [0,9,0,3,0,2,19],
                    [0,4,8,0,0,2,20],
                    [3,0,3,8,0,2,22],
                    [2,0,0,0,8,3,0]
                ],
                umaBonus: [1,1,1,1,1,1],
                stats: [1.1,1,1.1,0.8,1,0.5,1.5],
                cap:500,
                importance: 0.8
            },
            wisdom: {
                type: 4,
                bondPerDay: 2.5,
                trainingDays: 55,
                trainingGain: [
                    [10,0,4,0,0,2,21],
                    [0,9,0,3,0,2,19],
                    [0,4,8,0,0,2,20],
                    [3,0,3,8,0,2,22],
                    [2,0,0,0,8,3,0]
                ],
                umaBonus: [1,1,1,1,1,1],
                stats: [1.1,1,1,0.7,1,0.5,1.5],
                cap:500,
                importance: 0.8
            },
            friend: {
                type: 6,
                bondPerDay: 3.5,
                trainingDays: 50,
                trainingGain: [
                    [10,0,4,0,0,2,21],
                    [0,9,0,3,0,2,19],
                    [0,4,8,0,0,2,20],
                    [3,0,3,8,0,2,22],
                    [2,0,0,0,8,3,0]
                ],
                umaBonus: [1,1,1,1,1,1],
                stats: [1,1,1,0.7,1,0.5,1.5],
                cap:500,
                importance: 1
            }
        };

        this.onSettingChanged = this.onSettingChanged.bind(this);
        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.onCapChanged = this.onCapChanged.bind(this);
        this.onToggleWeights = this.onToggleWeights.bind(this);
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

    onCapChanged(event) {
        let settings = this.state[this.state.currentState];
        settings.cap = event.target.value;
        let newSettings = {};
        newSettings[this.state.currentState] = settings;
        this.setState(newSettings);
        this.props.onChange(settings);
    }

    onToggleWeights(event) {
        this.setState({show: !this.state.show});
    }

    render() {
        return (
            <div className="weights">
                <div className="weight-row">
                    <input id="speed" type="image" class={this.state.currentState == "speed" ? "image-btn selected" : "image-btn"} src={SpeedIcon} onClick={this.onTypeChanged} alt="Speed"/>
                    <input id="stamina" type="image" class={this.state.currentState == "stamina" ? "image-btn selected" : "image-btn"} src={StaminaIcon} onClick={this.onTypeChanged} alt="Stamina"/>
                    <input id="power" type="image" class={this.state.currentState == "power" ? "image-btn selected" : "image-btn"} src={PowerIcon} onClick={this.onTypeChanged} alt="Power"/>
                    <input id="guts" type="image" class={this.state.currentState == "guts" ? "image-btn selected" : "image-btn"} src={GutsIcon} onClick={this.onTypeChanged} alt="Guts"/>
                    <input id="wisdom" type="image" class={this.state.currentState == "wisdom" ? "image-btn selected" : "image-btn"} src={WisdomIcon} onClick={this.onTypeChanged} alt="Wisdom"/>
                    <input id="friend" type="image" class={this.state.currentState == "friend" ? "image-btn selected" : "image-btn"} src={FriendIcon} onClick={this.onTypeChanged} alt="Friend"/>
                </div>
                <div className="weight-row">
                    <button id="weights-toggle" type="button" onClick={this.onToggleWeights}>{this.state.show ? "Hide Settings" : "Customize Settings"}</button>
                </div>
                {
                    this.state.show &&
                    <>
                    <div className="weight-row">
                        <div class="section-header">Time Controls</div>
                        <div class="section-explanation">
                            Training turns should be roughly (75 - Races Done - Number of Rests/Dates)<br/>
                            The fewer bond and turns, the more Starting Bond matters.
                        </div>
                        <label for="bondPerDay">Bond Gained per Turn:</label>
                        <NumericInput onChange={this.onSettingChanged} type="number" id="bondPerDay" value={this.state[this.state.currentState].bondPerDay} min={1} max={9} step={0.25}/>
                        <label for="trainingDays">Available Training Turns:</label>
                        <NumericInput onChange={this.onSettingChanged} type="number" id="trainingDays" value={this.state[this.state.currentState].trainingDays} min={30} max={70} step={1}/>
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
                        <br/><br/><label for="stats.5">Skill Points</label>
                        <NumericInput onChange={this.onSettingChanged} type="number" id="stats.5" value={this.state[this.state.currentState].stats[5]} min={0} max={3} step={0.1}/>
                        <label for="stats.6">Energy</label>
                        <NumericInput onChange={this.onSettingChanged} type="number" id="stats.6" value={this.state[this.state.currentState].stats[6]} min={0} max={3} step={0.1}/>
                    </div>
                    <div className="weight-row">
                        <div class="section-header">Stat Cap</div>
                        <div class="section-explanation">
                            This will cap the stat gain, penalizing cards that only raise one stat.<br/>
                            Lower this if you tend to cap your stats very early to strengthen cards that raise multiple.
                        </div>
                        <input type="range" onChange={this.onCapChanged} min={300} max={1000} value={this.state[this.state.currentState].cap} class="slider" id="cap"/>
                        <label for="cap">{this.state[this.state.currentState].cap}</label>
                    </div>
                    </>
                }
                <div className="weight-row">
                    <div class="section-header">Uma's Bonuses</div>
                    <div class="section-explanation">
                        The percentages on the uma's stat screen, converted to decimal. <br/>
                        For example, 10% is 1.1, and 15% is 1.15.
                    </div>
                    <label for="umaBonus.0">Speed</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.0" value={this.state[this.state.currentState].umaBonus[0]} min={0.7} max={1.3} step={0.01}/>
                    <label for="umaBonus.1">Stamina</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.1" value={this.state[this.state.currentState].umaBonus[1]} min={0.7} max={1.3} step={0.01}/>
                    <label for="umaBonus.2">Power</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.2" value={this.state[this.state.currentState].umaBonus[2]} min={0.7} max={1.3} step={0.01}/>
                    <label for="umaBonus.3">Guts</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.3" value={this.state[this.state.currentState].umaBonus[3]} min={0.7} max={1.3} step={0.01}/>
                    <label for="umaBonus.4">Wisdom</label>
                    <NumericInput onChange={this.onSettingChanged} type="number" id="umaBonus.4" value={this.state[this.state.currentState].umaBonus[4]} min={0.7} max={1.3} step={0.01}/>
                </div>
            </div>
        );
    }
}

export default Weights;
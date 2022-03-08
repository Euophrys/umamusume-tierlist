import React from 'react';
import NumericInput from 'react-numeric-input';
import SpeedIcon from '../icons/utx_ico_obtain_00.png';
import StaminaIcon from '../icons/utx_ico_obtain_01.png';
import PowerIcon from '../icons/utx_ico_obtain_02.png';
import GutsIcon from '../icons/utx_ico_obtain_03.png';
import WisdomIcon from '../icons/utx_ico_obtain_04.png';
import FriendIcon from '../icons/utx_ico_obtain_05.png';
import { lsTest } from '../utils';

function defaultState() {
    return {
        version: 1,
        currentState: "speed",
        show: false,
        general: {
            bondPerDay: 2.5,
            races: [10,10,5,3],
            trainingGain: [
                [10,0,4,0,0,2,21],
                [0,9,0,3,0,2,19],
                [0,4,8,0,0,2,20],
                [3,0,3,8,0,2,22],
                [2,0,0,0,8,3,0]
            ],
            umaBonus: [1,1,1,1,1,1],
        },
        speed: {
            type: 0,
            stats: [1,1,1.1,1,1,0.5,1],
            cap:400,
            importance: 0.8
        },
        stamina: {
            type: 1,
            stats: [1,1,1,1.1,1,0.5,1],
            cap:400,
            importance: 0.66
        },
        power: {
            type: 2,
            stats: [1,1.1,1,1,1,0.5,1],
            cap:400,
            importance: 0.66
        },
        guts: {
            type: 3,
            stats: [2,1,2,1,1,0.5,1],
            cap:400,
            importance: 0.8
        },
        wisdom: {
            type: 4,
            stats: [1.1,1,1,1,1,0.5,1],
            cap:400,
            importance: 0.8
        },
        friend: {
            type: 6,
            stats: [1,1,1,1,1,0.5,1],
            cap:400,
            importance: 1
        }
    }
}

class Weights extends React.Component {
    constructor(props) {
        super(props);
        
        this.onSettingChanged = this.onSettingChanged.bind(this);
        this.onGeneralSettingChanged = this.onGeneralSettingChanged.bind(this);
        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.onCapChanged = this.onCapChanged.bind(this);
        this.onToggleWeights = this.onToggleWeights.bind(this);
        this.onReset = this.onReset.bind(this);

        if(lsTest()) {
            let savedWeights = window.localStorage.getItem("weights");
            if (savedWeights !== null) {
                savedWeights = JSON.parse(savedWeights);
                if (savedWeights.version == defaultState.version) {
                    this.state = savedWeights;
                    return this.props.onChange(this.state[this.state.currentState], this.state.general);
                }
            }
        }

        this.state = defaultState();
        this.props.onChange(this.state[this.state.currentState], this.state.general);
    }

    componentDidUpdate(prevProps, prevState) {
        if(lsTest()) {
            window.localStorage.setItem("weights", JSON.stringify(this.state));
        }
    }

    onReset() {
        let newState = defaultState();
        this.setState(newState);
        this.props.onChange(newState[newState.currentState], newState.general);
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

        this.props.onChange(settings, this.state.general);
    }

    onGeneralSettingChanged(event, numberString, numberInput) {
        if (!event) return;

        let settings = this.state.general;

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
        newSettings.general = settings;
        this.setState(newSettings);

        this.props.onChange(this.state[this.state.currentState], settings);
    }

    onTypeChanged(event) {
        this.setState({
            currentState: event.target.id
        });

        this.props.onChange(this.state[event.target.id], this.state.general);
    }

    onCapChanged(event) {
        let settings = this.state[this.state.currentState];
        settings.cap = event.target.value;
        let newSettings = {};
        newSettings[this.state.currentState] = settings;
        this.setState(newSettings);
        this.props.onChange(settings, this.state.general);
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
                    <button id="reset-weights" type="button" onClick={this.onReset}>Reset to Defaults</button>
                    </div>
                    <div className="weight-row">
                        <div class="section-header">Bond Rate</div>
                        <div class="section-explanation">
                            The fewer bond per turn, the more Starting Bond matters.
                        </div>
                        <label for="bondPerDay">Bond Gained per Turn:</label>
                        <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="bondPerDay" value={this.state.general.bondPerDay} min={1} max={9} step={0.25}/>
                    </div>
                    <div className="weight-row">
                        <div class="section-header">Optional Races</div>
                        <div class="section-explanation">
                            How many of each optional race class you do, for calculating Race Bonus points.
                        </div>
                        <label for="races.0">G1</label>
                        <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="races.0" value={this.state.general.races[0]} min={0} max={30} step={1}/>
                        <label for="races.1">G2/G3</label>
                        <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="races.1" value={this.state.general.races[1]} min={0} max={30} step={1}/>
                        <label for="races.2">OP/Pre-OP</label>
                        <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="races.2" value={this.state.general.races[2]} min={0} max={30} step={1}/>
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
                        <input type="range" onChange={this.onCapChanged} min={200} max={600} value={this.state[this.state.currentState].cap} class="slider" id="cap"/>
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
                    <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="umaBonus.0" value={this.state.general.umaBonus[0]} min={0.7} max={1.3} step={0.01}/>
                    <label for="umaBonus.1">Stamina</label>
                    <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="umaBonus.1" value={this.state.general.umaBonus[1]} min={0.7} max={1.3} step={0.01}/>
                    <label for="umaBonus.2">Power</label>
                    <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="umaBonus.2" value={this.state.general.umaBonus[2]} min={0.7} max={1.3} step={0.01}/>
                    <label for="umaBonus.3">Guts</label>
                    <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="umaBonus.3" value={this.state.general.umaBonus[3]} min={0.7} max={1.3} step={0.01}/>
                    <label for="umaBonus.4">Wisdom</label>
                    <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="umaBonus.4" value={this.state.general.umaBonus[4]} min={0.7} max={1.3} step={0.01}/>
                </div>
            </div>
        );
    }
}

export default Weights;
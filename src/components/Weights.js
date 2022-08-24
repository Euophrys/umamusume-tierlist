import React from 'react';
import NumericInput from 'react-numeric-input';
import SpeedIcon from '../icons/utx_ico_obtain_00.png';
import StaminaIcon from '../icons/utx_ico_obtain_01.png';
import PowerIcon from '../icons/utx_ico_obtain_02.png';
import GutsIcon from '../icons/utx_ico_obtain_03.png';
import WisdomIcon from '../icons/utx_ico_obtain_04.png';
import FriendIcon from '../icons/utx_ico_obtain_05.png';
import { lsTest } from '../utils';

function defaultGLState() {
    return {
        version: 7,
        currentState: "speed",
        show: false,
        general: {
            bondPerDay: 20,
            races: [8,2,0,3],
            unbondedTrainingGain: [
                [10,0,5,0,0,2,21],
                [0,9,0,4,0,2,19],
                [0,5,8,0,0,2,20],
                [4,0,4,8,0,2,22],
                [2,0,0,0,9,3,0]
            ],
            bondedTrainingGain: [
                [12,0,5,0,0,2,23],
                [0,11,0,4,0,2,21],
                [0,5,10,0,0,2,22],
                [4,0,4,10,0,2,24],
                [2,0,0,0,11,3,0]
            ],
            umaBonus: [1,1,1,1,1,1],
            multi: 1,
            bonusFS: 0.1,
            bonusSpec: 20,
            motivation: 0.2
        },
        speed: {
            type: 0,
            stats: [1,1,1.1,1,1,0.5,1.5],
            cap:500,
            minimum: 50,
        },
        stamina: {
            type: 1,
            stats: [1,1,1,1.1,1,0.5,1.5],
            cap:400,
            minimum: 40,
        },
        power: {
            type: 2,
            stats: [1,1.1,1,1,1,0.5,1.5],
            cap:400,
            minimum: 50,
        },
        guts: {
            type: 3,
            stats: [2,1,2,1,1,0.5,1.5],
            cap:450,
            minimum: 50,
        },
        wisdom: {
            type: 4,
            stats: [1.1,1,1,1,1,0.5,1.5],
            cap:400,
            minimum: 40,
        },
        friend: {
            type: 6,
            stats: [1,1,1,1,1,0.5,1.5],
            cap:400,
            minimum: 40,
        }
    }
}

function defaultMANTState() {
    return {
        version: 7,
        currentState: "speed",
        show: false,
        general: {
            bondPerDay: 20,
            races: [15,10,2,3],
            unbondedTrainingGain: [
                [8,0,4,0,0,2,19],
                [0,7,0,3,0,2,17],
                [0,4,6,0,0,2,18],
                [3,0,3,6,0,2,20],
                [2,0,0,0,6,3,0]
            ],
            bondedTrainingGain: [
                [10,0,4,0,0,2,21],
                [0,8,0,3,0,2,18],
                [0,4,7,0,0,2,19],
                [4,0,3,9,0,2,24],
                [3,0,0,0,9,3,0]
            ],
            umaBonus: [1,1,1,1,1,1],
            multi: 1.4,
            bonusFS: 0,
            bonusSpec: 0,
            motivation: 0.2
        },
        speed: {
            type: 0,
            stats: [1,1,1.1,1,1,0.5,1],
            cap:350,
            minimum: 50,
        },
        stamina: {
            type: 1,
            stats: [1,1,1,1.1,1,0.5,1],
            cap:350,
            minimum: 40,
        },
        power: {
            type: 2,
            stats: [1,1.1,1,1,1,0.5,1],
            cap:350,
            minimum: 50,
        },
        guts: {
            type: 3,
            stats: [2,1,2,1,1,0.5,1],
            cap:350,
            minimum: 50,
        },
        wisdom: {
            type: 4,
            stats: [1.1,1,1,1,1,0.5,1],
            cap:350,
            minimum: 40,
        },
        friend: {
            type: 6,
            stats: [1,1,1,1,1,0.5,1],
            cap:350,
            minimum: 40,
        }
    }
}

function defaultURAState() {
    return {
        version: 7,
        currentState: "speed",
        show: false,
        general: {
            bondPerDay: 20,
            races: [8,2,0,3],
            unbondedTrainingGain: [
                [10,0,5,0,0,2,21],
                [0,9,0,4,0,2,19],
                [0,5,8,0,0,2,20],
                [4,0,4,8,0,2,22],
                [2,0,0,0,9,3,0]
            ],
            bondedTrainingGain: [
                [12,0,5,0,0,2,23],
                [0,11,0,4,0,2,21],
                [0,5,10,0,0,2,22],
                [4,0,4,10,0,2,24],
                [2,0,0,0,11,3,0]
            ],
            umaBonus: [1,1,1,1,1,1],
            multi: 1,
            bonusFS: 0,
            bonusSpec: 0,
            motivation: 0.2
        },
        speed: {
            type: 0,
            stats: [1,1,1.1,1,1,0.5,1.5],
            cap:350,
            minimum: 50,
        },
        stamina: {
            type: 1,
            stats: [1,1,1,1.1,1,0.5,1.5],
            cap:350,
            minimum: 40,
        },
        power: {
            type: 2,
            stats: [1,1.1,1,1,1,0.5,1.5],
            cap:350,
            minimum: 50,
        },
        guts: {
            type: 3,
            stats: [2,1,2,1,1,0.5,1.5],
            cap:350,
            minimum: 50,
        },
        wisdom: {
            type: 4,
            stats: [1.1,1,1,1,1,0.5,1.5],
            cap:350,
            minimum: 40,
        },
        friend: {
            type: 6,
            stats: [1,1,1,1,1,0.5,1.5],
            cap:350,
            minimum: 40,
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
        this.onMinimumChanged = this.onMinimumChanged.bind(this);
        this.onToggleWeights = this.onToggleWeights.bind(this);
        this.onMotivationChanged = this.onMotivationChanged.bind(this);
        this.onMANTReset = this.onMANTReset.bind(this);
        this.onURAReset = this.onURAReset.bind(this);
        this.onGLReset = this.onGLReset.bind(this);

        if(lsTest()) {
            let savedWeights = window.localStorage.getItem("weights");
            if (savedWeights !== null) {
                savedWeights = JSON.parse(savedWeights);
                if (savedWeights.version == defaultMANTState().version) {
                    this.state = savedWeights;
                    return this.props.onChange(this.state[this.state.currentState], this.state.general);
                }
            }
        }

        this.state = defaultGLState();
        this.props.onChange(this.state[this.state.currentState], this.state.general);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState && prevState !== this.state && lsTest()) {
            window.localStorage.setItem("weights", JSON.stringify(this.state));
        }
    }

    onGLReset() {
        let newState = defaultGLState();
        this.setState(newState);
        this.props.onChange(newState[newState.currentState], newState.general);
    }

    onMANTReset() {
        let newState = defaultMANTState();
        this.setState(newState);
        this.props.onChange(newState[newState.currentState], newState.general);
    }

    onURAReset() {
        let newState = defaultURAState();
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

    onMotivationChanged(event) {
        let settings = this.state.general;
        settings.motivation = event.target.value;
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

    onMinimumChanged(event) {
        let settings = this.state[this.state.currentState];
        settings.minimum = event.target.value;
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
                    <button id="reset-weights-GL" type="button" onClick={this.onGLReset}>GL Defaults</button>
                    <button id="reset-weights-MANT" type="button" onClick={this.onMANTReset}>MANT Defaults</button>
                    <button id="reset-weights-URA" type="button" onClick={this.onURAReset}>URA Defaults</button>
                    </div>
                    <div className="weight-row">
                        <div class="section-header">Bond Rate</div>
                        <div class="section-explanation">
                            The fewer bond per turn, the more Starting Bond matters.<br/>
                            This is the bond over every card, so 14 = two cards per day, etc.
                        </div>
                        <label for="bondPerDay">Bond Gained per Turn:</label>
                        <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="bondPerDay" value={this.state.general.bondPerDay} min={1} max={50} step={0.1}/>
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
                        <div class="section-header">Scenario Specific</div>
                        <div class="section-explanation">
                            Multiplier accounts for MANT items. 1.4 is a medium megaphone.<br/>
                            Bonus Friendship and Specialty is for Grand Live lessons / live bonuses.
                        </div>
                        <label for="multi">Multiplier:</label>
                        <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="multi" value={this.state.general.multi} min={1} max={2.2} step={0.05}/>
                        <label for="bonusFS">Bonus Friendship:</label>
                        <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="bonusFS" value={this.state.general.bonusFS} min={-1} max={1} step={0.05}/>
                        <label for="bonusSpec">Bonus Specialty:</label>
                        <NumericInput onChange={this.onGeneralSettingChanged} type="number" id="bonusSpec" value={this.state.general.bonusSpec} min={-1} max={95} step={5}/>
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
                        <div class="section-header">Average Motivation</div>
                        <div class="section-explanation">
                            You get 10% per motivation stage. This affects Motivation Bonus.
                        </div>
                        <input type="range" onChange={this.onMotivationChanged} min={-0.2} max={0.2} step={0.05} value={this.state.general.motivation} class="slider" id="motivation"/>
                        <label for="minimum">{this.state.general.motivation * 100}%</label>
                    </div>
                    <div className="weight-row">
                        <div class="section-header">Stat Cap</div>
                        <div class="section-explanation">
                            This will cap the stat gain, penalizing cards that only raise one stat.<br/>
                            Lower this if you tend to cap your stats very early to strengthen cards that raise multiple.
                        </div>
                        <input type="range" onChange={this.onCapChanged} min={200} max={500} step={10} value={this.state[this.state.currentState].cap} class="slider" id="cap"/>
                        <label for="cap">{this.state[this.state.currentState].cap}</label>
                    </div>
                    <div className="weight-row">
                        <div class="section-header">Minimum Training Value</div>
                        <div class="section-explanation">
                            Any training combination that gives less than this will be ignored.<br/>
                            Increase this to ignore trainings you wouldn't do, such as lone rainbows.<br/>
                            Solo MLB Kitasan rainbow is about 40, depending on the weights, for reference.
                        </div>
                        <input type="range" onChange={this.onMinimumChanged} min={20} max={100} step={5} value={this.state[this.state.currentState].minimum} class="slider" id="minimum"/>
                        <label for="minimum">{this.state[this.state.currentState].minimum}</label>
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
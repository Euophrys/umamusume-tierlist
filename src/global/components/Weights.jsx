import React from "react";
import NumericInput from "../../components/NumericInput";
import SpeedIcon from "../../icons/utx_ico_obtain_00.png";
import StaminaIcon from "../../icons/utx_ico_obtain_01.png";
import PowerIcon from "../../icons/utx_ico_obtain_02.png";
import GutsIcon from "../../icons/utx_ico_obtain_03.png";
import WisdomIcon from "../../icons/utx_ico_obtain_04.png";
import FriendIcon from "../../icons/utx_ico_obtain_05.png";
import { lsTest } from "../../utils";

function defaultGMState() {
    return {
        version: 26,
        currentState: "speed",
        show: false,
        general: {
            bondPerDay: 10,
            races: [10, 2, 0, 5],
            unbondedTrainingGain: [
                [10, 0, 3, 0, 0, 5, 19],
                [0, 8, 0, 6, 0, 5, 20],
                [0, 4, 9, 0, 0, 5, 20],
                [2, 0, 3, 9, 0, 5, 20],
                [2, 0, 0, 0, 8, 5, 0],
            ],
            bondedTrainingGain: [
                [13, 0, 4, 0, 0, 5, 23],
                [0, 9, 0, 6, 0, 5, 21],
                [0, 4, 10, 0, 0, 5, 21],
                [3, 0, 3, 12, 0, 5, 24],
                [3, 0, 0, 0, 11, 5, 0],
            ],
            summerTrainingGain: [
                [14, 0, 5, 0, 0, 5, 24],
                [0, 12, 0, 8, 0, 5, 25],
                [0, 6, 13, 0, 0, 5, 25],
                [4, 0, 4, 13, 0, 5, 25],
                [4, 0, 0, 0, 12, 5, 0],
            ],
            umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
            multi: 1.25,
            bonusSpec: 0,
            motivation: 0.2,
            scenarioLink: ["ダーレーアラビアン"],
            scenarioBonus: 150,
            fanBonus: 0.1,
        },
        speed: {
            type: 0,
            stats: [1.1, 1, 2, 1, 1, 2, 1.5],
            cap: 600,
            minimum: 20,
            prioritize: true,
            onlySummer: false,
        },
        stamina: {
            type: 1,
            stats: [1, 1, 1, 1.1, 1, 2, 1.5],
            cap: 550,
            minimum: 20,
            prioritize: false,
            onlySummer: false,
        },
        power: {
            type: 2,
            stats: [1, 1.1, 1, 1, 1, 2, 1.5],
            cap: 550,
            minimum: 20,
            prioritize: false,
            onlySummer: false,
        },
        guts: {
            type: 3,
            stats: [2, 1, 2, 1, 1, 2, 1.5],
            cap: 550,
            minimum: 20,
            prioritize: true,
            onlySummer: false,
        },
        wisdom: {
            type: 4,
            stats: [1.1, 1, 1, 1, 1.1, 2, 1],
            cap: 600,
            minimum: 20,
            prioritize: true,
            onlySummer: false,
        },
        friend: {
            type: 6,
            stats: [1, 1, 1, 1, 1, 2, 0.75],
            cap: 500,
            minimum: 20,
        },
    };
}

function defaultGLState() {
    return {
        version: 18,
        currentState: "speed",
        show: false,
        general: {
            bondPerDay: 10,
            races: [7, 2, 0, 3],
            unbondedTrainingGain: [
                [8, 0, 4, 0, 0, 2, 19],
                [0, 8, 0, 6, 0, 2, 20],
                [0, 4, 9, 0, 0, 2, 20],
                [2, 0, 2, 7, 0, 2, 20],
                [2, 0, 0, 0, 6, 3, 0],
            ],
            bondedTrainingGain: [
                [11, 0, 5, 0, 0, 2, 23],
                [0, 9, 0, 6, 0, 2, 21],
                [0, 4, 10, 0, 0, 2, 21],
                [3, 0, 2, 10, 0, 2, 24],
                [3, 0, 0, 0, 9, 3, 0],
            ],
            summerTrainingGain: [
                [12, 0, 6, 0, 0, 2, 24],
                [0, 12, 0, 8, 0, 2, 25],
                [0, 6, 13, 0, 0, 2, 25],
                [3, 0, 3, 11, 0, 2, 25],
                [4, 0, 0, 0, 10, 3, 0],
            ],
            umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
            multi: 1.4,
            bonusSpec: 20,
            motivation: 0.2,
            scenarioLink: [
                "ミホノブルボン",
                "ライトハロー",
                "スマートファルコン",
                "アグネスタキオン",
                "サイレンススズカ",
            ],
            scenarioBonus: 75,
            fanBonus: 0.05,
        },
        speed: {
            type: 0,
            stats: [1.1, 1, 1.2, 1, 1, 0.5, 1.5],
            cap: 600,
            minimum: 35,
            prioritize: true,
            onlySummer: false,
        },
        stamina: {
            type: 1,
            stats: [1, 1, 1, 1.1, 1, 0.5, 1.5],
            cap: 550,
            minimum: 35,
            prioritize: false,
            onlySummer: false,
        },
        power: {
            type: 2,
            stats: [1, 1.1, 1, 1, 1, 0.5, 1.5],
            cap: 550,
            minimum: 35,
            prioritize: false,
            onlySummer: false,
        },
        guts: {
            type: 3,
            stats: [2, 1, 2, 1, 1, 0.5, 1.5],
            cap: 550,
            minimum: 30,
            prioritize: true,
            onlySummer: false,
        },
        wisdom: {
            type: 4,
            stats: [1.1, 1, 1, 1, 1.1, 0.5, 1],
            cap: 600,
            minimum: 30,
            prioritize: true,
            onlySummer: false,
        },
        friend: {
            type: 6,
            stats: [1, 1, 1, 1, 1, 0.5, 0.75],
            cap: 500,
            minimum: 30,
        },
    };
}

function defaultMANTState() {
    return {
        version: 18,
        currentState: "speed",
        show: false,
        general: {
            bondPerDay: 10,
            races: [15, 10, 2, 3],
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
                [12, 0, 6, 0, 0, 2, 24],
                [0, 11, 0, 5, 0, 2, 22],
                [0, 6, 10, 0, 0, 2, 23],
                [4, 0, 4, 10, 0, 2, 25],
                [4, 0, 0, 0, 10, 3, 0],
            ],
            umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
            multi: 1.4,
            bonusSpec: 0,
            motivation: 0.2,
            scenarioLink: [],
            scenarioBonus: 0,
            fanBonus: 0.15,
        },
        speed: {
            type: 0,
            stats: [1, 1, 1.1, 1, 1, 0.5, 1],
            cap: 350,
            minimum: 50,
            prioritize: true,
            onlySummer: false,
        },
        stamina: {
            type: 1,
            stats: [1, 1, 1, 1.1, 1, 0.5, 1],
            cap: 350,
            minimum: 40,
            prioritize: false,
            onlySummer: false,
        },
        power: {
            type: 2,
            stats: [1, 1.1, 1, 1, 1, 0.5, 1],
            cap: 350,
            minimum: 50,
            prioritize: false,
            onlySummer: false,
        },
        guts: {
            type: 3,
            stats: [2, 1, 2, 1, 1, 0.5, 1],
            cap: 350,
            minimum: 50,
            prioritize: true,
            onlySummer: false,
        },
        wisdom: {
            type: 4,
            stats: [1.1, 1, 1, 1, 1, 0.5, 1],
            cap: 350,
            minimum: 40,
            prioritize: true,
            onlySummer: false,
        },
        friend: {
            type: 6,
            stats: [1, 1, 1, 1, 1, 0.5, 0.5],
            cap: 350,
            minimum: 40,
        },
    };
}

function defaultAoharuState() {
    return {
        version: 18,
        currentState: "wisdom",
        show: false,
        general: {
            bondPerDay: 10,
            races: [7, 2, 0, 3],
            unbondedTrainingGain: [
                [8, 0, 4, 0, 0, 4, 19],
                [0, 8, 0, 6, 0, 4, 20],
                [0, 4, 9, 0, 0, 4, 20],
                [3, 0, 3, 6, 0, 4, 20],
                [2, 0, 0, 0, 6, 5, 0],
            ],
            bondedTrainingGain: [
                [12, 0, 5, 0, 0, 4, 24],
                [0, 12, 0, 7, 0, 4, 25],
                [0, 5, 13, 0, 0, 4, 25],
                [4, 0, 3, 10, 0, 4, 25],
                [3, 0, 0, 0, 10, 5, 0],
            ],
            summerTrainingGain: [
                [13, 0, 6, 0, 0, 4, 25],
                [0, 13, 0, 8, 0, 4, 26],
                [0, 6, 14, 0, 0, 4, 26],
                [4, 0, 4, 11, 0, 4, 26],
                [4, 0, 0, 0, 11, 5, 0],
            ],
            umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
            multi: 1,
            bonusSpec: 0,
            motivation: 0.2,
            scenarioLink: [
                "マチカネフクキタル",
                "ハルウララ",
                "樫本理子",
                "ライスシャワー",
                "タイキシャトル",
            ],
            scenarioBonus: 40,
            fanBonus: 0.05,
        },
        speed: {
            type: 0,
            stats: [1, 1.5, 1.5, 1, 1, 0.5, 1],
            cap: 550,
            minimum: 40,
            prioritize: false,
            onlySummer: false,
        },
        stamina: {
            type: 1,
            stats: [1, 1.5, 1.5, 1.1, 1, 0.5, 1],
            cap: 400,
            minimum: 30,
            prioritize: false,
            onlySummer: false,
        },
        power: {
            type: 2,
            stats: [1, 1.5, 1.5, 1, 1, 0.5, 1],
            cap: 400,
            minimum: 30,
            prioritize: false,
            onlySummer: false,
        },
        guts: {
            type: 3,
            stats: [2, 1.5, 2, 1, 1, 0.5, 1],
            cap: 500,
            minimum: 40,
            prioritize: false,
            onlySummer: false,
        },
        wisdom: {
            type: 4,
            stats: [1.2, 1, 1, 1, 1.5, 1, 0.5],
            cap: 900,
            minimum: 30,
            prioritize: true,
            onlySummer: false,
        },
        friend: {
            type: 6,
            stats: [1, 1.5, 1.5, 1, 1, 0.5, 0.5],
            cap: 500,
            minimum: 40,
        },
    };
}

function defaultURAState() {
    return {
        version: 18,
        currentState: "speed",
        show: false,
        general: {
            bondPerDay: 10,
            races: [7, 2, 0, 3],
            unbondedTrainingGain: [
                [11, 0, 6, 0, 0, 4, 21],
                [0, 10, 0, 6, 0, 4, 19],
                [0, 6, 9, 0, 0, 4, 20],
                [5, 0, 5, 8, 0, 4, 22],
                [2, 0, 0, 0, 10, 5, 0],
            ],
            bondedTrainingGain: [
                [13, 0, 6, 0, 0, 4, 23],
                [0, 11, 0, 6, 0, 4, 21],
                [0, 6, 11, 0, 0, 4, 22],
                [5, 0, 5, 10, 0, 4, 24],
                [2, 0, 0, 0, 12, 5, 0],
            ],
            summerTrainingGain: [
                [15, 0, 8, 0, 0, 4, 24],
                [0, 14, 0, 7, 0, 4, 25],
                [0, 8, 13, 0, 0, 4, 25],
                [6, 0, 6, 12, 0, 4, 25],
                [4, 0, 0, 0, 14, 5, 0],
            ],
            umaBonus: [1.06, 1.06, 1.06, 1.06, 1.06, 1],
            multi: 1,
            bonusSpec: 0,
            motivation: 0.2,
            scenarioLink: ["Aoi Kiryuin"],
            scenarioBonus: 16,
            fanBonus: 0.05,
        },
        speed: {
            type: 0,
            stats: [1, 1.5, 1.5, 1, 1, 0.5, 1],
            cap: 500,
            minimum: 40,
            prioritize: true,
            onlySummer: false,
        },
        stamina: {
            type: 1,
            stats: [1, 1.5, 1.5, 1.1, 1, 0.5, 1],
            cap: 400,
            minimum: 30,
            prioritize: false,
            onlySummer: false,
        },
        power: {
            type: 2,
            stats: [1, 1.5, 1.5, 1, 1, 0.5, 1],
            cap: 400,
            minimum: 30,
            prioritize: false,
            onlySummer: false,
        },
        guts: {
            type: 3,
            stats: [2, 1.5, 2, 1, 1, 0.5, 1],
            cap: 500,
            minimum: 40,
            prioritize: true,
            onlySummer: false,
        },
        wisdom: {
            type: 4,
            stats: [1.1, 1.5, 1.5, 1, 1, 0.5, 1],
            cap: 500,
            minimum: 30,
            prioritize: true,
            onlySummer: false,
        },
        friend: {
            type: 6,
            stats: [1, 1.5, 1.5, 1, 1, 0.5, 0.5],
            cap: 500,
            minimum: 40,
        },
    };
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
        this.onAoharuReset = this.onAoharuReset.bind(this);
        this.onGLReset = this.onGLReset.bind(this);
        this.onGMReset = this.onGMReset.bind(this);

        if (lsTest()) {
            let savedWeights = window.localStorage.getItem("weights");
            if (savedWeights !== null) {
                savedWeights = JSON.parse(savedWeights);
                if (savedWeights.version == defaultAoharuState().version) {
                    this.state = savedWeights;
                    return this.props.onChange(
                        this.state[this.state.currentState],
                        this.state.general,
                    );
                }
            }
        }

        this.state = defaultMANTState();
        this.props.onChange(
            this.state[this.state.currentState],
            this.state.general,
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState && prevState !== this.state && lsTest()) {
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

    onAoharuReset() {
        let newState = defaultAoharuState();
        this.setState(newState);
        this.props.onChange(newState[newState.currentState], newState.general);
    }

    onGMReset() {
        let newState = defaultGMState();
        this.setState(newState);
        this.props.onChange(newState[newState.currentState], newState.general);
    }

    onSettingChanged(event, numberString, numberInput) {
        if (!event) return;

        let settings = this.state[this.state.currentState];

        if (typeof event === "number") {
            if (numberInput.id.indexOf(".") > 0) {
                let split = numberInput.id.split(".");
                settings[split[0]][split[1]] = event;
            } else {
                settings[numberInput.id] = event;
            }
        } else {
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
            if (numberInput.id.indexOf(".") > 0) {
                let split = numberInput.id.split(".");
                settings[split[0]][split[1]] = event;
            } else {
                settings[numberInput.id] = event;
            }
        } else {
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
            currentState: event.target.id,
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
        this.setState({ show: !this.state.show });
    }

    render() {
        const resetScenarios = [
            { id: "reset-weights-GL", label: "GM", handler: () => this.onGMReset() },
            { id: "reset-weights-GL", label: "GL", handler: () => this.onGLReset() },
            {
                id: "reset-weights-MANT",
                label: "TB",
                handler: () => this.onMANTReset(),
            },
            {
                id: "reset-weights-URA",
                label: "Unity",
                handler: () => this.onAoharuReset(),
            },
            {
                id: "reset-weights-URA",
                label: "URA",
                handler: () => this.onURAReset(),
            },
        ];

        return (
            <div className="weights font-sans text-left">
                {/* Type Tab Selector Row */}
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-zinc-850 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                        Select Stat Type
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
                            ];
                            const label =
                                type === "wisdom"
                                    ? "Wit"
                                    : type.charAt(0).toUpperCase() + type.slice(1);
                            const isActive = this.state.currentState === type;
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
                            );
                        },
                    )}
                </div>

                <div className="mb-4">
                    <button
                        id="weights-toggle"
                        type="button"
                        onClick={this.onToggleWeights}
                        className="w-full text-center py-2 border border-slate-300 dark:border-zinc-700 rounded-lg text-xs font-bold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850  shadow-sm focus:outline-none"
                    >
                        {this.state.show ? "Hide Settings" : "Customize Settings"}
                    </button>
                </div>

                {this.state.show && (
                    <div className="space-y-5">
                        {/* Scenario reset card */}
                        <div className="p-3.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1">
                                Scenario Presets
                            </h4>
                            <p className="text-[10px] text-slate-400 dark:text-zinc-500 mb-3 leading-relaxed">
                                Swaps training gains and multipliers to match specific game
                                scenarios.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {resetScenarios.map((scen, idx) => (
                                    <button
                                        key={idx}
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
                                        Initial Friendship Gauge
                                    </h4>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-normal mt-0.5">
                                        Average bond points gained per turn.
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
                                        Optional Races
                                    </h4>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-normal mt-0.5">
                                        Counts of G1, G2/G3, and OP races run for calculating Race
                                        Bonus points.
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
                                        Scenario Modifiers
                                    </h4>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-normal mt-0.5">
                                        TB items or GL friendship song multipliers.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                                            Multiplier
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
                                            Spec. Bonus
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
                                        Stat Weights
                                    </h4>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 leading-normal mt-0.5">
                                        Multiplier values assigned to each specific training stat.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                                            Speed
                                        </span>
                                        <NumericInput
                                            onChange={this.onSettingChanged}
                                            id="stats.0"
                                            value={this.state[this.state.currentState].stats[0]}
                                            min={0}
                                            max={3}
                                            step={0.1}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                                            Stamina
                                        </span>
                                        <NumericInput
                                            onChange={this.onSettingChanged}
                                            id="stats.1"
                                            value={this.state[this.state.currentState].stats[1]}
                                            min={0}
                                            max={3}
                                            step={0.1}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                                            Power
                                        </span>
                                        <NumericInput
                                            onChange={this.onSettingChanged}
                                            id="stats.2"
                                            value={this.state[this.state.currentState].stats[2]}
                                            min={0}
                                            max={3}
                                            step={0.1}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                                            Guts
                                        </span>
                                        <NumericInput
                                            onChange={this.onSettingChanged}
                                            id="stats.3"
                                            value={this.state[this.state.currentState].stats[3]}
                                            min={0}
                                            max={3}
                                            step={0.1}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                                            Wit
                                        </span>
                                        <NumericInput
                                            onChange={this.onSettingChanged}
                                            id="stats.4"
                                            value={this.state[this.state.currentState].stats[4]}
                                            min={0}
                                            max={3}
                                            step={0.1}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                                            Skill Pts
                                        </span>
                                        <NumericInput
                                            onChange={this.onSettingChanged}
                                            id="stats.5"
                                            value={this.state[this.state.currentState].stats[5]}
                                            min={0}
                                            max={3}
                                            step={0.1}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                                            Energy
                                        </span>
                                        <NumericInput
                                            onChange={this.onSettingChanged}
                                            id="stats.6"
                                            value={this.state[this.state.currentState].stats[6]}
                                            min={0}
                                            max={3}
                                            step={0.1}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sliders & Caps */}
                            <div className="p-3.5 border border-slate-200 dark:border-zinc-850 rounded-xl space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                                            Mood Effect
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
                                            Stat Cap
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
                                            Min Train Score
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
                                        Rainbow Rate Alterations
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
                                                    Prioritize This Stat
                                                </label>
                                                <span className="text-[10px] block leading-normal mt-0.5">
                                                    Ignore single rainbows in this stat if other stats are
                                                    rainbowing.
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
                                                    Only Train In Summer
                                                </label>
                                                <span className="text-[10px] block leading-normal mt-0.5">
                                                    All rainbows will be ignored in this stat except in
                                                    summer.
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
                        Uma's Bonuses
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mb-3 leading-relaxed">
                        Percentages on your Uma's stat screen in decimals (e.g. 10% is 1.1,
                        15% is 1.15).
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                        <div className="flex flex-col space-y-1">
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                                Spd
                            </span>
                            <NumericInput
                                onChange={this.onGeneralSettingChanged}
                                id="umaBonus.0"
                                value={this.state.general.umaBonus[0]}
                                min={0.7}
                                max={1.3}
                                step={0.01}
                                precision={2}
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                                Stm
                            </span>
                            <NumericInput
                                onChange={this.onGeneralSettingChanged}
                                id="umaBonus.1"
                                value={this.state.general.umaBonus[1]}
                                min={0.7}
                                max={1.3}
                                step={0.01}
                                precision={2}
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                                Pow
                            </span>
                            <NumericInput
                                onChange={this.onGeneralSettingChanged}
                                id="umaBonus.2"
                                value={this.state.general.umaBonus[2]}
                                min={0.7}
                                max={1.3}
                                step={0.01}
                                precision={2}
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                                Gut
                            </span>
                            <NumericInput
                                onChange={this.onGeneralSettingChanged}
                                id="umaBonus.3"
                                value={this.state.general.umaBonus[3]}
                                min={0.7}
                                max={1.3}
                                step={0.01}
                                precision={2}
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-semibold text-center">
                                Wit
                            </span>
                            <NumericInput
                                onChange={this.onGeneralSettingChanged}
                                id="umaBonus.4"
                                value={this.state.general.umaBonus[4]}
                                min={0.7}
                                max={1.3}
                                step={0.01}
                                precision={2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weights;

import React from 'react';
import SupportCard from './SupportCard';
import events from '../card-events';
import { supportCardProperties } from '../constants';
import Select from 'react-select';

const ordinal = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];
const type_names = ["Speed", "Stamina", "Power", "Guts", "Wisdom", "", "Friend"];

class TierList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dropdownSelections: ["none","none","none"]
        }

        this.onDropdown1Changed = this.onDropdown1Changed.bind(this);
        this.onDropdown2Changed = this.onDropdown2Changed.bind(this);
        this.onDropdown3Changed = this.onDropdown3Changed.bind(this);
    }

    //lmao
    onDropdown1Changed(newValue) {
        let newSelections = this.state.dropdownSelections.slice();
        newSelections[0] = newValue.value;
        console.log(newValue);
        this.setState({dropdownSelections:newSelections});
    }
    onDropdown2Changed(newValue) {
        let newSelections = this.state.dropdownSelections.slice();
        newSelections[1] = newValue.value;
        this.setState({dropdownSelections:newSelections});
    }
    onDropdown3Changed(newValue) {
        let newSelections = this.state.dropdownSelections.slice();
        newSelections[2] = newValue.value;
        this.setState({dropdownSelections:newSelections});
    }

    render() {
        let cards = this.props.cards;
    
        if(this.props.weights.type > -1) {
            cards = cards.filter(e => e.type === this.props.weights.type);
        }
    
        let processedCards = processCards(cards, this.props.weights, this.props.selectedCards);
    
        if (processedCards.length === 0) {
            return <div className="tier-list"></div>;
        }
    
        let rows = [[]];
        let current_row = 0;
        let step = (processedCards[0].score - processedCards[processedCards.length - 1].score) / 7;
        let boundary = processedCards[0].score - step;
    
        for (let i = 0; i < processedCards.length; i++) {
            while (processedCards[i].score < boundary - 1) {
                rows.push([]);
                current_row++;
                boundary -= step;
            }
    
            rows[current_row].push((
                <SupportCard
                    id={processedCards[i].id}
                    lb={processedCards[i].lb}
                    score={processedCards[i].score}
                    key={processedCards[i].id + "LB" + processedCards[i].lb}
                    info={processedCards[i].info}
                    charName={processedCards[i].char_name}
                    card={cards.find((c) => c.id === processedCards[i].id && c.limit_break === processedCards[i].lb)}
                    onClick={() => this.props.cardSelected(cards.find((c) => c.id === processedCards[i].id && c.limit_break === processedCards[i].lb))}
                    stats={this.state.dropdownSelections}
                />
            ));
        }
    
        let tiers = [];
    
        for (let i = 0; i < 7; i++) {
            tiers.push(
                <div className="tier" key={tierNames[i]}>
                    <div className="tier-letter">{tierNames[i]}</div>
                    <div className="tier-images">{rows[i]}</div>
                </div>
            )
        }
    
        let count = this.props.selectedCards.filter((c) => c.type == this.props.weights.type).length;
        let dropdownOptions = [{value:"none", label:"None"}];
        let properties = Object.keys(supportCardProperties).sort();
        for (let i = 0; i < properties.length; i++) {
            dropdownOptions.push({
                value:properties[i],
                label:supportCardProperties[properties[i]].friendly_name
            });
        }
    
        return (
            <div className="tier-list">
                <div className="selectors">
                    <span className="selectLabel">Show Stats:</span>
                    <Select className="select" options={dropdownOptions} onChange={this.onDropdown1Changed} defaultValue={{value:"none", label:"None"}}/>
                    <Select className="select" options={dropdownOptions} onChange={this.onDropdown2Changed} defaultValue={{value:"none", label:"None"}}/>
                    <Select className="select" options={dropdownOptions} onChange={this.onDropdown3Changed} defaultValue={{value:"none", label:"None"}}/>
                </div>
                <span className="label">Ranking for the {ordinal[count]} {type_names[this.props.weights.type]} card in this deck:</span>
                {tiers}
            </div>
        );
    }
}

const tierNames = ['S', 'A', 'B', 'C', 'D', 'E', 'F']
const scenarioLink = [
]
const raceRewards = [
    [2, 2, 2, 2, 2, 35],
    [1.6, 1.6, 1.6, 1.6, 1.6, 25],
    [1, 1, 1, 1, 1, 20],
    [13.5,13.5,13.5,13.5,13.5,50]
]

function processCards(cards, weights, selectedCards) {
    let processedCards = [];
    selectedCards = selectedCards.slice();
    
    // Calculate some stuff here so we don't have to do it a million times later
    let presentTypes = [false,false,false,false,false,false,false]
    let baseBondNeeded = 0;
    for (let card = 0; card < selectedCards.length; card++) {
        let selectedCard = selectedCards[card];
        let cardSpecialty = (100 + selectedCard.specialty_rate) * selectedCard.unique_specialty;
        let cardSpecialtyPercent = (cardSpecialty) / (450 + cardSpecialty)
        selectedCard.rainbowSpecialty = cardSpecialtyPercent;
        selectedCard.offSpecialty = 100 / (450 + cardSpecialty);
        selectedCard.cardType = selectedCard.type;
        presentTypes[selectedCard.cardType] = true;
        if (selectedCard.cardType == 6) {
            baseBondNeeded += 55 - selectedCard.sb
        } else {
            baseBondNeeded += 75 - selectedCard.sb
        }
        if (events[selectedCard.id]) {
            baseBondNeeded -= events[selectedCard.id][7];
        }
    }

    for (let i = 0; i < cards.length; i++) {
        let info = {};
        let card = cards[i];
        let cardType = card.type;
        let bondNeeded = baseBondNeeded;
        if (cardType == 6) {
            bondNeeded += 55 - card.sb
        } else {
            bondNeeded += 75 - card.sb
        }
        let presentTypesWithCard = presentTypes.slice();
        presentTypesWithCard[cardType] = true;

        let typeCount = presentTypesWithCard.filter(Boolean).length;

        // Add starting stats and stats from events
        let energyGain = 0;
        let statGains = card.starting_stats.slice();
        statGains.push(0);
        
        info.starting_stats = card.starting_stats.slice();
        info.event_stats = [0,0,0,0,0,0,0];
        
        if (events[card.id]) {
            info.event_stats = events[card.id].slice();
            for (let stat = 0; stat < 6; stat++) {
                statGains[stat] += events[card.id][stat] * card.effect_size_up;
                info.event_stats[stat] = events[card.id][stat] * card.effect_size_up;
            }
            energyGain += events[card.id][6] * card.energy_up;
            bondNeeded -= events[card.id][7];
        } else {
            // Dummy event values for cards we don't yet know the events for
            if (card.rarity === 2) {
                // 35 total
                for (let stat = 0; stat < 5; stat++) {
                    statGains[stat] += 7;
                }
                bondNeeded -= 5;
            } else if (card.rarity === 3) {
                // 45 total
                for (let stat = 0; stat < 5; stat++) {
                    statGains[stat] += 9;
                }
                bondNeeded -= 5;
            }
        }

        if (card.type_stats > 0) {
            statGains[card.type] += card.type_stats;
            for (let sc = 0; sc < selectedCards.length; sc++) {
                if(selectedCards[sc].type < 6) {
                    statGains[selectedCards[sc].type] += card.type_stats;
                } else {
                    statGains[0] += card.type_stats / 5;
                    statGains[1] += card.type_stats / 5;
                    statGains[2] += card.type_stats / 5;
                    statGains[3] += card.type_stats / 5;
                    statGains[4] += card.type_stats / 5;
                }
            }
        }

        let trainingDays = 65 - weights.races[0] - weights.races[1] - weights.races[2];
        let daysToBond = bondNeeded / weights.bondPerDay;
        let rainbowDays = trainingDays - daysToBond;
        let specialty = (100 + card.specialty_rate) * card.unique_specialty;
        let specialtyPercent = specialty / (450 + specialty);
        let otherPercent = 100 / (450 + specialty);
        let daysPerTraining = [0,0,0,0,0];
        let bondedDaysPerTraining = [0,0,0,0,0];
        let rainbowTraining = 0;
        
        // Calculate appearance rates on each training
        for (let stat = 0; stat < 5; stat++) {
            if (stat == cardType) {
                rainbowTraining = specialtyPercent * rainbowDays;
                daysPerTraining[stat] = specialtyPercent * daysToBond;
            } else {
                daysPerTraining[stat] = otherPercent / 4 * daysToBond;
                bondedDaysPerTraining[stat] = otherPercent / 4 * rainbowDays;
            }
        }

        if (card.fs_ramp[0] > 0) {
            let current_bonus = 0;
            let total = 0;
            for (let j = rainbowTraining * 0.66; j > 0; j--) {
                total += current_bonus;
                current_bonus = Math.min(current_bonus + card.fs_ramp[0], card.fs_ramp[1]);
            }
            card.unique_fs_bonus = 1 + total / rainbowTraining / 100;
        }

        // Stats from cross-training
        info.non_rainbow_gains = [0,0,0,0,0,0,0];
        for (let training = 0; training < 5; training ++) {
            let gains = weights.trainingGain[training];
            let daysOnThisTraining = daysPerTraining[training];
            energyGain += daysOnThisTraining * gains[6] * card.energy_discount;

            let trainingGains = CalculateCrossTrainingGain(gains, weights, card, selectedCards, training, daysOnThisTraining, typeCount, false);
            
            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += trainingGains[stat];
                info.non_rainbow_gains[stat] += trainingGains[stat];
            }
            info.non_rainbow_gains[6] += (daysOnThisTraining * gains[6] * card.energy_discount);
        }

        // Stats from cross-training while bonded
        for (let training = 0; training < 5; training ++) {
            let gains = weights.trainingGain[training];
            let daysOnThisTraining = bondedDaysPerTraining[training];
            energyGain += daysOnThisTraining * gains[6] * card.energy_discount;

            let trainingGains = CalculateCrossTrainingGain(gains, weights, card, selectedCards, training, daysOnThisTraining, typeCount, true);
            
            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += trainingGains[stat];
                info.non_rainbow_gains[stat] += trainingGains[stat];
            }
            info.non_rainbow_gains[6] += (daysOnThisTraining * gains[6] * card.energy_discount);

            if (training == 5 && card.group) {
                energyGain += daysOnThisTraining * card.wisdom_recovery;
            }
        }

        info.rainbow_gains = [0,0,0,0,0,0,0];

        // Stats from rainbows
        if (cardType < 6) {
            energyGain += rainbowTraining * card.wisdom_recovery;
            let specialtyGains = weights.trainingGain[cardType];
            let trainingGains = CalculateTrainingGain(specialtyGains, weights, card, selectedCards, cardType, rainbowTraining, true, typeCount);

            info.rainbow_gains = trainingGains.slice();
            info.rainbow_gains.push(rainbowTraining * card.wisdom_recovery);

            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += trainingGains[stat];
            }
        }

        info.race_bonus_gains = 0;

        // Race bonus
        for (let raceType = 0; raceType < 4; raceType++) {
            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += raceRewards[raceType][stat] * (card.race_bonus / 100) * weights.races[raceType];
                info.race_bonus_gains += raceRewards[raceType][stat] * (card.race_bonus / 100) * weights.races[raceType];
            }
        }

        // Convert stat gains to score
        let score = GainsToScore(statGains, weights);
        score += energyGain * weights.stats[6];

        processedCards.push({
            id: card.id,
            lb: card.limit_break,
            score: score,
            info: info,
            char_name: card.char_name
        })
    }

    processedCards.sort((a, b) => b.score - a.score);
    return processedCards;
}

function CalculateTrainingGain(gains, weights, card, otherCards, trainingType, days, rainbow, typeCount) {
    let trainingGains = [0,0,0,0,0,0,0];

    let trainingBonus = card.tb;
    if (typeCount >= card.highlander_threshold) trainingBonus += card.highlander_training;
    let fsBonus = 1;
    let motivationBonus = card.mb;
    if (rainbow) {
        fsBonus = card.fs_bonus * card.unique_fs_bonus;
        motivationBonus += card.fs_motivation;
        trainingBonus += card.fs_training;
    }

    let soloGain = [0,0,0,0,0,0];
    for (let stat = 0; stat < 6; stat ++) {
        if (gains[stat] === 0) continue;

        let base = gains[stat] + card.stat_bonus[stat];
        if (rainbow) {
            base += card.fs_stats[stat];
        }
        soloGain[stat] += (base 
            * trainingBonus
            * (1 + weights.motivation * motivationBonus)
            * fsBonus
            * 1.05
            * weights.umaBonus[stat]
            - gains[stat]);
    }
    if (GainsToScore(soloGain, weights) > weights.minimum) {
        for (let stat = 0; stat < 6; stat ++) {
            trainingGains[stat] += soloGain[stat]
                * days
                * CalculateCombinationChance([], otherCards, trainingType)
                * (rainbow ? weights.multi : 1);
        }
    }
    
    if (otherCards.length == 0) return trainingGains;

    const combinations = GetCombinations(otherCards);

    for (let i = 0; i < combinations.length; i++) {
        let fullCombinationGains = [0,0,0,0,0,0];
        let fullTotalGains = [0,0,0,0,0,0];
        for (let stat = 0; stat < 6; stat ++) {
            if (gains[stat] === 0) continue;

            let combinationTrainingBonus = combinations[i].reduce((current, c) => {
                let training = current + c.tb - 1;
                if (typeCount >= c.highlander_threshold)
                    training += c.highlander_training;
                return training;
            }, 1);
            let combinationFriendshipBonus = combinations[i].reduce((current, c) => {
                if (c.cardType === trainingType) {
                    return current * c.fs_bonus * c.unique_fs_bonus;
                } else {
                    return current;
                }
            }, 1);
            let combinationMotivationBonus = combinations[i].reduce((current, c) => current + c.mb - 1, 1);
            let combinationStatBonus = combinations[i].reduce((current, c) => current + c.stat_bonus[stat], 0);

            let base = gains[stat] + combinationStatBonus;
            if (rainbow) {
                base += card.fs_stats[stat];
            }

            let combinationGains = (base 
                * combinationTrainingBonus
                * (1 + weights.motivation * combinationMotivationBonus)
                * combinationFriendshipBonus
                * (1.05 * combinations[i].length)
                * weights.umaBonus[stat]);
                
            let totalGains = ((base + card.stat_bonus[stat])
                * (combinationTrainingBonus + trainingBonus - 1)
                * (1 + weights.motivation * (combinationMotivationBonus + motivationBonus - 1))
                * (combinationFriendshipBonus * fsBonus)
                * (1.05 * (combinations[i].length + 1))
                * weights.umaBonus[stat]);
            
            fullCombinationGains[stat] += combinationGains;
            fullTotalGains[stat] += totalGains;
        }
        if (GainsToScore(fullTotalGains, weights) > weights.minimum) {
            for (let stat = 0; stat < 6; stat ++) {
                trainingGains[stat] += (fullTotalGains[stat] - fullCombinationGains[stat]) 
                    * days
                    * CalculateCombinationChance(combinations[i], otherCards, trainingType)
                    * (rainbow ? weights.multi : 1);
            }
        }
    }

    return trainingGains;
}

function CalculateCrossTrainingGain(gains, weights, card, otherCards, trainingType, days, typeCount, bonded) {
    let trainingGains = [0,0,0,0,0,0,0];
    let statCards = otherCards.filter((c) => c.cardType === trainingType);
    let trainingBonus = card.tb;
    if (typeCount >= card.highlander_threshold) trainingBonus += card.highlander_training;
    let fsBonus = 1;
    if (card.group && bonded) {
        fsBonus += (card.fs_bonus + card.unique_fs_bonus - 1) / 4;
    }
    const combinations = GetCombinations(otherCards);

    for (let i = 0; i < combinations.length; i++) {
        let fullCombinationGains = [0,0,0,0,0,0];
        let fullTotalGains = [0,0,0,0,0,0];
        for (let stat = 0; stat < 6; stat ++) {
            if (gains[stat] === 0) continue;
            const combination = combinations[i];
            if(!combination.some((r) => statCards.indexOf(r) > -1)) continue;

            let combinationTrainingBonus = combination.reduce((current, c) => {
                let training = current + c.tb - 1;
                if (typeCount >= c.highlander_threshold)
                    training += c.highlander_training;
                return training;
            }, 1);
            let combinationFriendshipBonus = combination.reduce((current, c) => {
                if (c.cardType === trainingType) {
                    return current * c.fs_bonus * c.unique_fs_bonus;
                } else {
                    return current;
                }
            }, 1);
            let combinationMotivationBonus = combination.reduce((current, c) => current + c.mb - 1, 1);
            let combinationStatBonus = combination.reduce((current, c) => current + c.stat_bonus[stat], 0);

            const base = gains[stat] + combinationStatBonus;

            let combinationGains = (base 
                * combinationTrainingBonus
                * (1 + weights.motivation * combinationMotivationBonus)
                * combinationFriendshipBonus
                * (1.05 * combination.length)
                * weights.umaBonus[stat]);
            
            let totalGains = 0;
            if (bonded) {
                totalGains = ((base + card.stat_bonus[stat] + card.fs_stats[stat])
                    * (combinationTrainingBonus + trainingBonus + card.fs_training - 1)
                    * (1 + weights.motivation * (combinationMotivationBonus + card.mb + card.fs_motivation - 1))
                    * (combinationFriendshipBonus * fsBonus)
                    * (1.05 * (combination.length + 1))
                    * weights.umaBonus[stat]);
            } else {
                totalGains = ((base + card.stat_bonus[stat])
                    * (combinationTrainingBonus + trainingBonus - 1)
                    * (1 + weights.motivation * (combinationMotivationBonus + card.mb - 1))
                    * (1.05 * (combination.length + 1))
                    * weights.umaBonus[stat]);
            }
            
            fullCombinationGains[stat] += combinationGains;
            fullTotalGains[stat] += totalGains;
        }
        if (GainsToScore(fullTotalGains, weights) > weights.minimum) {
            for (let stat = 0; stat < 6; stat ++) {
                trainingGains[stat] += (fullTotalGains[stat] - fullCombinationGains[stat]) 
                    * days
                    * CalculateCombinationChance(combinations[i], otherCards, trainingType)
                    * weights.multi;
            }
        }
    }

    return trainingGains;
}

function GainsToScore(gains, weights) {
    let score = 0;
    for (let stat = 0; stat < 6; stat ++) {
        score += Math.min(gains[stat], weights.cap) * weights.stats[stat];
    }
    return score;
}

function GetCombinations(cards) {
    let combinations = [];
    let temp = [];
    const count = Math.pow(2, cards.length);

    for (let i = 0; i < count; i++){
        temp = [];
        for (let j = 0; j<cards.length; j++) {
            if (i & Math.pow(2,j)) { 
                temp.push(cards[j]);
            }
        }
        if (temp.length > 0) {
            combinations.push(temp);
        }
    }

    return combinations;
}

function CalculateCombinationChance(combination, cards, trainingType) {
    const otherCards = cards.filter((c) => combination.findIndex((d) => c.id == d.id) === -1);

    let chance = combination.reduce((current, card) => {
        if (card.cardType === trainingType) {
            return current * card.rainbowSpecialty;
        } else {
            return current * card.offSpecialty;
        }
    }, 1);

    chance = otherCards.reduce((current, card) => {
        if (card.cardType === trainingType) {
            return current * (1 - card.rainbowSpecialty);
        } else {
            return current * (1 - card.offSpecialty);
        }
    }, chance);

    return chance;
}

export default TierList;
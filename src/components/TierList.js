import React from 'react';
import SupportCard from './SupportCard';
import events from '../card-events';

function TierList(props) {
    let cards = props.cards;

    cards = cards.filter(e => e.id > 20000 || e.limit_break === 4);

    if(props.weights.type > -1) {
        cards = cards.filter(e => types[e.type] === props.weights.type);
    }

    let processedCards = processCards(cards, props.weights, props.selectedCards);

    let rows = [[]];
    let current_row = 0;
    let step = (processedCards[0].score - processedCards[processedCards.length - 1].score) / 7;
    let boundary = processedCards[0].score - step;

    for (let i = 0; i < processedCards.length; i++) {
        while (processedCards[i].score < boundary) {
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
                onClick={() => props.cardSelected(cards.find((c) => c.id === processedCards[i].id && c.limit_break === processedCards[i].lb))}
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

    return (
        <div className="tier-list">
            {tiers}
        </div>
    );
}

const tierNames = ['S', 'A', 'B', 'C', 'D', 'E', 'F']
const types = {
    0: 6,
    101: 0,
    102: 2,
    103: 3,
    105: 1,
    106: 4
}

function processCards(cards, weights, selectedCards) {
    let processedCards = [];
    selectedCards = selectedCards.slice();

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardType = types[card.type];
        let daysToBond = (80 - card.starting_bond) / weights.bondPerDay;
        let rainbowDays = weights.trainingDays - daysToBond;
        let specialtyPercent = 0.18 + (card.specialty_rate / 1000 * 1.5);
        let daysPerTraining = [0,0,0,0,0];
        let rainbowTraining = 0;
        
        // Calculate appearance rates on each training, modified by training importance
        for (let stat = 0; stat < 5; stat++) {
            if (stat == cardType) {
                rainbowTraining = specialtyPercent * rainbowDays;
                daysPerTraining[stat] = specialtyPercent * daysToBond;
            } else {
                daysPerTraining[stat] = (0.9 - specialtyPercent) / 4 * weights.trainingDays * weights.trainingImportance[stat];
            }
        }

        // Calculate some stuff here so we don't have to do it a million times later
        for (let card = 0; card < selectedCards.length; card++) {
            let cardSpecialtyPercent = 0.18 + (selectedCards[card].specialty_rate / 1000 * 1.5);
            selectedCards[card].rainbowSpecialty = cardSpecialtyPercent;
            selectedCards[card].offSpecialty = (0.9 - cardSpecialtyPercent) / 4;
            selectedCards[card].cardType = types[selectedCards[card].cardType];
        }

        // Add starting stats and stats from events
        let statGains = card.starting_stats.slice();
        statGains.push(0);
        let energyGain = 0;

        if (events[card.id]) {
            for (let stat = 0; stat < 6; stat++) {
                statGains[stat] += events[card.id][stat] * card.effect_size_up;
            }
            energyGain += events[card.id][6] * card.energy_up;

            if (cardType == 6) {
                energyGain -= weights.supportPenalty;
            }
        }

        // Stats from non-rainbow training
        for (let training = 0; training < 5; training ++) {
            let gains = weights.trainingGain[training];
            let daysOnThisTraining = daysPerTraining[training];
            energyGain += daysOnThisTraining * gains[6] * card.energy_discount;

            let trainingGains = CalculateTrainingGain(gains, weights, card, selectedCards, training, daysOnThisTraining, false);

            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += trainingGains[stat];
            }
        }

        // Stats from rainbows
        if (cardType < 6) {
            energyGain += rainbowTraining * card.wisdom_recovery;
            let specialtyGains = weights.trainingGain[cardType];
            let trainingGains = CalculateTrainingGain(specialtyGains, weights, card, selectedCards, cardType, rainbowTraining, true);

            for (let stat = 0; stat < 6; stat ++) {
                statGains[stat] += trainingGains[stat];
            }
        }

        // Race bonus
        for (let stat = 0; stat < 5; stat ++) {
            statGains[stat] += card.race_bonus * 3 / 5;
        }
        statGains[5] = card.race_bonus * 8;

        // Convert stat gains to score
        let score = 0;
        for (let stat = 0; stat < 6; stat ++) {
            score += statGains[stat] * weights.stats[stat];
        }
        score += energyGain * weights.stats[6];

        processedCards.push({
            id: card.id,
            lb: card.limit_break,
            score: score
        })
    }

    processedCards.sort((a, b) => b.score - a.score);
    return processedCards;
}

function CalculateTrainingGain(gains, weights, card, otherCards, trainingType, days, rainbow) {
    let trainingGains = [0,0,0,0,0,0,0];

    let trainingBonus = card.training_bonus;
    let friendshipBonus = 1;
    if (rainbow) {
        friendshipBonus = card.friendship_bonus * card.unique_friendship_bonus;
    }
    let motivationBonus = card.motivation_bonus;

    for (let stat = 0; stat < 6; stat ++) {
        if (gains[stat] === 0) continue;

        const base = gains[stat] + card.stat_bonus[stat];
        trainingGains[stat] += (base 
            * trainingBonus
            * (1 + 0.2 * motivationBonus)
            * friendshipBonus
            * 1.05
            - gains[stat])
            * days
            * weights.umaBonus[stat]
            * CalculateCombinationChance([], otherCards, trainingType);
    }
    
    if (otherCards.length == 0) return trainingGains;

    const combinations = GetCombinations(otherCards);

    for (let i = 0; i < combinations.length; i++) {
        for (let stat = 0; stat < 6; stat ++) {
            let combinationTrainingBonus = combinations[i].reduce((current, c) => current + c.training_bonus - 1, trainingBonus);
            let combinationFriendshipBonus = combinations[i].reduce((current, c) => {
                if (c.cardType === trainingType) {
                    return current * c.friendship_bonus * c.unique_friendship_bonus;
                } else {
                    return current;
                }
            }, friendshipBonus);
            let combinationMotivationBonus = combinations[i].reduce((current, c) => current + c.motivation_bonus - 1, motivationBonus);
            let combinationStatBonus = combinations[i].reduce((current, c) => current + c.stat_bonus[stat], card.stat_bonus[stat]);

            const base = gains[stat] + combinationStatBonus;

            trainingGains[stat] += (base 
                * combinationTrainingBonus
                * (1 + 0.2 * combinationMotivationBonus)
                * combinationFriendshipBonus
                * 1.05
                - gains[stat])
                * days
                * weights.umaBonus[stat]
                * CalculateCombinationChance(combinations[i], otherCards, trainingType);
        }
    }

    return trainingGains;
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
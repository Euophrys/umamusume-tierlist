import React from 'react';
import SupportCard from './SupportCard';
import events from '../card-events';

function TierList(props) {
    let cards = props.cards;

    cards = cards.filter(e => e.id > 20000 || e.limit_break == 4);

    if(props.weights.type > -1) {
        cards = cards.filter(e => types[e.type] == props.weights.type);
    }

    let processedCards = processCards(cards, props.weights);

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
            />
        ));
    }

    let tiers = [];

    for (let i = 0; i < 7; i++) {
        tiers.push(
            <div className="tier">
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

function processCards(cards, weights) {
    let processedCards = [];

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardType = types[card.type];
        let daysToBond = (80 - card.starting_bond) / weights.bondPerDay;
        let rainbowDays = weights.trainingDays - daysToBond;
        let specialtyPercent = 0.18 + (card.specialty_rate / 1000 * 1.5);
        let daysPerTraining = [0,0,0,0,0];
        let rainbowTraining = 0;
        
        for (let stat = 0; stat < 5; stat++) {
            if (stat == cardType) {
                rainbowTraining = specialtyPercent * rainbowDays;
                daysPerTraining[stat] = specialtyPercent * daysToBond;
            } else {
                daysPerTraining[stat] = (0.9 - specialtyPercent) / 4 * weights.trainingDays * weights.trainingImportance[stat];
            }
        }

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

        for (let training = 0; training < 5; training ++) {
            let gains = weights.trainingGain[training];
            let daysOnThisTraining = daysPerTraining[training];
            energyGain += daysOnThisTraining * gains[6] * card.energy_discount;

            for (let stat = 0; stat < 6; stat ++) {
                if (gains[stat] == 0) continue;

                let base = gains[stat] + card.stat_bonus[stat];
                statGains[stat] += (base 
                    * card.training_bonus
                    * (1 + 0.2 * card.motivation_bonus)
                    * 1.05
                    - gains[stat])
                    * daysOnThisTraining
                    * weights.umaBonus[stat];
            }
        }

        if (cardType < 6) {
            energyGain += rainbowTraining * card.wisdom_recovery;
            let specialtyGains = weights.trainingGain[cardType];

            for (let stat = 0; stat < 6; stat ++) {
                if (specialtyGains[stat] == 0) continue;

                let base = specialtyGains[stat] + card.stat_bonus[stat];
                statGains[stat] += (base 
                    * card.training_bonus
                    * (1 + 0.2 * card.motivation_bonus)
                    * card.friendship_bonus
                    * card.unique_friendship_bonus
                    * 1.05
                    - specialtyGains[stat])
                    * rainbowTraining
                    * weights.umaBonus[stat];
            }
        }

        if(card.id == 30015 && card.limit_break == 4) {
            console.log("Stat Gains after Rainbow: " + statGains);
        }

        for (let stat = 0; stat < 5; stat ++) {
            statGains[stat] += card.race_bonus * 3 / 5;
        }
        statGains[5] = card.race_bonus * 8;

        if(card.id == 30015 && card.limit_break == 4) {
            console.log("Stat Gains after Race: " + statGains);
        }

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

export default TierList;
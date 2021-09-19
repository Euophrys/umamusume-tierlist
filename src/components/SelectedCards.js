import React from 'react';

function SelectedCards(props) {
    let cards = [];
    
    for (let i = 0; i < props.selectedCards.length; i++) {
        let lit_up = "";
        let dark = "";

        for(let j = 0; j < 4; j++) {
            if (j < props.selectedCards[i].limit_break) {
                lit_up += "◆";
            } else {
                dark += "◆";
            }
        }

        cards.push(
            <div className="support-card">
                <img
                    className="support-card-image"
                    name={props.selectedCards[i].id}
                    src={process.env.PUBLIC_URL + "/cardImages/support_card_s_" + props.selectedCards[i].id + ".png"}
                    title={props.selectedCards[i].id}
                    alt={props.selectedCards[i].id}
                    onClick={() => props.onClick(props.selectedCards[i])}
                />
                <span className="limit-breaks">
                    <span className="lb-yes">{lit_up}</span>
                    <span className="lb-no">{dark}</span>
                </span>
            </div>
        );
    }

    return (
        <div className="selected-cards">
            <div className="section-header">Support Deck</div>
            <div className="section-explanation">
                The cards you're using. Click one to remove it, and click one in the tier list to add it.<br/>
                The score will consider the stats gained when training with these cards.
            </div>
            {cards}
        </div>
    );
}

export default SelectedCards;
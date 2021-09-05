import React from 'react';

function SupportCard(props) {
    let lit_up = "";
    let dark = "";
    
    for(let i = 0; i < 4; i++) {
        if (i < props.lb) {
            lit_up += "◆";
        } else {
            dark += "◆";
        }
    }

    return (
        <div className="support-card">
            <img
                className="support-card-image"
                name={props.id}
                src={process.env.PUBLIC_URL + "/cardImages/support_card_s_" + props.id + ".png"}
                title={props.score}
                alt={props.score}
                onClick={props.onClick}
            />
            <span className="limit-breaks">
                <span className="lb-yes">{lit_up}</span>
                <span className="lb-no">{dark}</span>
            </span>
        </div>
    );
}

export default SupportCard;
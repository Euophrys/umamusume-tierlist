import React from 'react';
import SpeedIcon from '../icons/utx_ico_obtain_00.png';
import StaminaIcon from '../icons/utx_ico_obtain_01.png';
import PowerIcon from '../icons/utx_ico_obtain_02.png';
import GutsIcon from '../icons/utx_ico_obtain_03.png';
import WisdomIcon from '../icons/utx_ico_obtain_04.png';
import FriendIcon from '../icons/utx_ico_obtain_05.png';

const type_to_icon = [
    SpeedIcon,
    StaminaIcon,
    PowerIcon,
    GutsIcon,
    WisdomIcon,
    "",
    FriendIcon,
]

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
                <img
                    className="type-icon"
                    name="type icon"
                    src={type_to_icon[props.selectedCards[i].type]}
                    title="type"
                    alt="card type"
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
                The score will consider the stats gained when training with these cards.<br/>
                You must have at least one card here for the tier list to work properly.
            </div>
            {cards}
            <div>
                Presets:
                <button className="btn-preset" onClick={()=>props.onLoadPreset([30028,20023,20031,20024,20003])}>Speed/Power</button>
                <button className="btn-preset" onClick={()=>props.onLoadPreset([30028,20023,20031,20012,20015])}>Speed/Int</button>
                <button className="btn-preset" onClick={()=>props.onLoadPreset([30028,20031,20012,20015,20002])}>Int/Speed</button>
                <button className="btn-preset" onClick={()=>props.onLoadPreset([20023,20031,10060,30034,20003])}>Mid/Long</button>
                <button className="btn-preset" onClick={()=>props.onLoadPreset([30019,20041,20038,20012,30010])}>Guts/Int</button>
            </div>
            <div>
                <button className="btn-preset" onClick={()=>props.onLoadPreset([30028,20023,20031,20008,30022])}>Speed/Stamina</button>
                <button className="btn-preset" onClick={()=>props.onLoadPreset([30078,20003,20027,20041,20038])}>Speed/Pow/Guts</button>
                <button className="btn-preset" onClick={()=>props.onLoadPreset([30078,20008,30022,20041,20038])}>Speed/Stam/Guts</button>
            </div>
        </div>
    );
}

export default SelectedCards;
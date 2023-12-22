import React from "react";
import {PlayerBoard} from "../PlayerBoard/PlayerBoard.jsx";

export const Board = (props) => {
    const myPlayedCard = props.cards[0]
    const adversoryPlayedCard = props.cards[1]
    return (<div>
        <PlayerBoard card={myPlayedCard}></PlayerBoard>
        <PlayerBoard card={adversoryPlayedCard}></PlayerBoard>
    </div>)
}

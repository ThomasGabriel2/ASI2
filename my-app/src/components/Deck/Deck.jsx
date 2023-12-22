import React from "react";
import {Card} from "../Card/Card.jsx";

export const Deck = (props) => {





    console.log(props.cards)
    let display = props.cards.map((card) => <div className="ui segment">
        <Card card={card} key={card.id}></Card>
        <button className='ui button'>Jouer</button>
    </div>)
    return(
        <div className="store">
            {display}
        </div>

    )
}
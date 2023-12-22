import {Card} from "../Card/Card.jsx";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";

export const Inventory = () => {


    const [cards, setCards] = useState([]);
    let user = useSelector(state => state.userReducer.authUser);

    const fetchCard = async (cardId) => {
        try {
            const response = await axios.get(`http://localhost:8083/card/${cardId}`);
            console.log(response.data)
            return response.data;

        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des données:', error);
        }
    };

    const fetchCards = async () => {
        if (user !== null) {
            setCards( await Promise.all(user.cardList.map(cardId => fetchCard(cardId))));
        }
    }

    useEffect(() => {
        setCards([])
        fetchCards()

    }, []);
    let display_card = cards.map(
        (card) => <div className="ui segment">
            <Card card={card} key={card.id}></Card>
            <button className='ui button'>Vendre</button>
        </div>
    )


    return (
        <div className="store">
            {user ? (
                display_card
            ) : (
                <div>
                    Vous devez vous connecter pour voir votre inventaire
                </div>

                )
            }
        </div>
    );
};

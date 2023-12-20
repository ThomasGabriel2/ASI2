import React, {useState, useEffect} from "react";
import './Shop.css';
import {Card} from "../Card/Card.jsx";
import axios from "axios";

export const Shop = () => {

  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8083/cards_to_sell');
      setCards(response.data);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  let display_card = cards.map(
      (card) => <div className="ui segment">
        <Card card={card} key={card.id}></Card>
        <button className='ui button'>Acheter</button>
      </div>
  )
  return (
      <div className="store">
      {display_card}
    </div>
  );
};

import React, {useState, useEffect} from "react";
import './Shop.css';
import {Card} from "../Card/Card.jsx";
import axios from "axios";
import {Button} from "semantic-ui-react";
import {useSelector} from "react-redux";

export const Shop = () => {

  const [cards, setCards] = useState([]);
  let user = useSelector(state => state.userReducer.authUser);

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

  const buy = (card_id) =>  {
    if (user != undefined) {
      try {
        const response = await axios.post('http://localhost:8083/buy', {user_id: user.id, card_id:card_id});
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'achat', error);
      }
    }
  }


  let display_card = cards.map(
      (card) => <div className="ui segment" key={card.id}>
        <Card card={card} key={card.id}></Card>
        <Button className='ui button' type={"button"} onClick={() => buy(card.id)} key={card.id}>Acheter</Button>
      </div>
  )
  return (
      <div className="store">
      {display_card}
    </div>
  );
};

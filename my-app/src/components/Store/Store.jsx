import './Store.css';

const cards = [
  {
    "name": "Carte 1",
    "description": "Description de la carte 1",
    "family": "Famille 1",
    "affinity": "Affinité 1",
    "imgUrl": "url_image_1.jpg",
    "smallImgUrl": "url_image_petite_1.jpg",
    "id": 1,
    "energy": 10,
    "hp": 20,
    "defence": 5,
    "attack": 15,
    "price": 10,
    "userId": 101
  },
  {
    "name": "Carte 2",
    "description": "Description de la carte 2",
    "family": "Famille 2",
    "affinity": "Affinité 2",
    "imgUrl": "url_image_2.jpg",
    "smallImgUrl": "url_image_petite_2.jpg",
    "id": 2,
    "energy": 15,
    "hp": 25,
    "defence": 8,
    "attack": 20,
    "price": 15,
    "userId": 102
  },
  // Ajoutez d'autres cartes selon vos besoins
];

export const Store = () => {
  return (
    <div className="store">
      {cards.map(card => (
        <div key={card.id} className="card">
          <img src={card.smallImgUrl} alt={card.name} className="card-image" />
          <h3 className="card-name">{card.name}</h3>
          <p className="card-description">{card.description}</p>
          <p className="card-price">${card.price}</p>
          <button>Acheter</button>
        </div>
      ))}
    </div>
  );
};

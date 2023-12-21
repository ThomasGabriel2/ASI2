class Card {
    constructor({ id, name, description, family, affinity, imgUrl, smallImgUrl, energy, defence, attack, userId, storeId}) {
        this.id = id;
        this.name= name;
        this.description = description;
        this.family = family;
        this.affinity = affinity;
        this.imgUrl = imgUrl;
        this.smallImgUrl = smallImgUrl;
        this.energy= energy;
        this.defence = defence;
        this.attack = attack;
        this.userId = userId;
        this.storeId = storeId;
    }
}

module.exports = Card;
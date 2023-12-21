const User = require("../models/User");
const Card = require("../models/Card");

class UserService {
    constructor() {
        this.users = new Map(); // Utilisation d'une Map pour stocker les utilisateurs par leur ID
        this.usersInstance = [];
        this.cards=[];
    }
    // Fonction pour ajouter un utilisateur
    addUser(socket, idUser) {
        this.users.set(idUser, socket);
    }
    // Fonction pour supprimer un utilisateur
    removeUser(id) {
        this.users.delete(id);
        console.log('user deleted');
    }
    // Fonction pour obtenir la socket d'un utilisateur par son ID

    getSocket(id) {
        let ids = id.toString();
        const userArray = this.users.get(ids);
        if (userArray) {
            return userArray;
        }
        return null; // Ou une autre valeur par défaut si aucun utilisateur n'est trouvé pour cet ID
    }
    getUsers() {
            const allUsers = [];
            for (const id of this.users.keys()){
                for (const user of this.usersInstance){
                    if (id == user.id){
                        allUsers.push(user);
                    }
                }
            }
            return allUsers;
        }

    updateCards(){
        for (let user of this.usersInstance){
            user.cardList = this.cards.filter(card => user.cardList.includes(card.id));
        }
        console.log(this.usersInstance)
    }
    setUsers(users) {
        users.forEach(user => {
            const { id, pwd, lastName, surName , cardList } = user; // Filtrer les attributs souhaités
            this.usersInstance.push(new User({ id, lastName, surName, pwd, cardList})); // Créer une nouvelle instance User avec les attributs filtrés

        });
    }
    setCards(cards) {
        cards.forEach(card => {
            const { id, name, description, family, affinity, imgUrl, smallImgUrl, energy, defence, attack, userId, storeId} = card; // Filtrer les attributs souhaités
            this.cards.push(new Card({ id, name, description, family, affinity, imgUrl, smallImgUrl, energy, defence, attack, userId, storeId})); // Créer une nouvelle instance User avec les attributs filtrés

        });
    }




    login(username, password){
        for (let user of this.usersInstance) {
            if (user.lastName == username && user.pwd == password) {
                return user
            }
        }
            return null

        }

    changementId(socket,id){
        let ids = socket.toString();
        if (this.users.has(ids)) {
            let valeur =this.users.get(ids); // Obtenez la valeur associée à la clé 'cle1'
            this.users.delete(ids); // Supprimez la paire clé-valeur avec l'ancienne clé 'cle1'
            this.users.set(id.toString(), valeur); // Ajoutez une nouvelle paire clé-valeur avec la nouvelle clé 'cle3'
        }}

    getUser(id){
            for (let user of this.usersInstance){
                console.log(user)
                if (user.id == id){
                    return user;
                }

        }
        return null;
    }
}

module.exports = new UserService();

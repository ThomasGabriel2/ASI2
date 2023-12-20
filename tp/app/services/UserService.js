const User = require("../models/User");


class UserService {
    constructor() {
        this.users = new Map(); // Utilisation d'une Map pour stocker les utilisateurs par leur ID
        this.usersInstance = [];
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
        const userArray = this.users.get(id);
        if (userArray) {
            const [socket] = userArray;
            return socket;
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
        }}
    setUsers(users) {
        users.forEach(user => {
            const { id, lastName, surName } = user; // Filtrer les attributs souhaités
            this.usersInstance.push(new User({ id, lastName, surName })); // Créer une nouvelle instance User avec les attributs filtrés
            console.log(this.usersInstance)
        });
    }
}

module.exports = new UserService();

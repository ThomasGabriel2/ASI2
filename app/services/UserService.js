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
    setUsers(users) {
        users.forEach(user => {
            const { id, pwd, lastName, surName } = user; // Filtrer les attributs souhaités
            this.usersInstance.push(new User({ id, lastName, surName, pwd })); // Créer une nouvelle instance User avec les attributs filtrés

        });
        console.log(this.usersInstance)
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
}

module.exports = new UserService();

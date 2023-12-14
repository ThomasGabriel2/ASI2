class UserManager {
    constructor() {
        this.users = new Map(); // Utilisation d'une Map pour stocker les utilisateurs par leur ID
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
        return this.users.get(id);
    }
}

module.exports = new UserManager();

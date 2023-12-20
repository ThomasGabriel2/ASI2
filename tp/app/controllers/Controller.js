const messageService = require('../services/MessageService');
const userService = require('../services/UserService')
const Message = require('../models/Message');
const axios = require('axios');

class Controller {
    constructor() {
        console.log(`new MessageController`);
    }

    init({ io, socket }) {
        socket.on('send message', data => {
            const msg = new Message({
                emet: data.emet,
                mess: data.mess,
                dest: data.dest
            });
            console.log(msg)
            let dest = messageService.getDest(msg.dest);
            if (data.mess==null){
                console.log(dest)
                msg.mess="ok"
                dest.emit('receive invitation', msg);
                console.log('invitation envoyé')
            }
            else if (dest != null) {
                dest.emit('receive message', msg);
                console.log('message envoyé à un')
            } else {
                io.emit('receive message', msg);
                console.log('message envoyé à tous')
            }
        });
        socket.on('refresh users',()=>{
            const users = userService.getUsers();
            console.log("Envoi des nouveaux utilisateurs: ", users)
            io.emit('reception users', users);
        });
    }

    async getUsersFromSpring() {
        try {
            const response = await axios.get('http://localhost:8083/users');
            userService.setUsers(response.data); // Affichage de la réponse
        } catch (error) {
            console.error(error); // Gestion des erreurs
        }

    };

}

module.exports = new Controller();

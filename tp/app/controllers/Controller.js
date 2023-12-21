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
            console.log("Envoi des utilisateurs:", users)
            io.emit('reception users', users);
        });

        socket.on('login',data =>{
            const rep = userService.login(data.username, data.pwd);
            let dest = messageService.getDest(data.emet);
            dest.emit('reponse login', rep);
        });

        socket.on('changement id', data =>{
           userService.changementId(data.emet,data.id);
        });


        socket.on('invitation response', data =>{
            const dest = userService.getSocket(data.dest[0]);
            dest.emit('invit rep',data.answer);
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

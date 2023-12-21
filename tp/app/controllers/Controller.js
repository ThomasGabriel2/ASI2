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
                const user2 = userService.getUser(msg.emet[0]);
                dest.emit('receive invitation', ({msg : msg, user2 : user2}));
                console.log('invitation envoyé')
            }
            else if (dest != null) {
                dest.emit('receive message', msg );
                // const ret = messageService.getDest(msg.emet[0])
                // ret.emit('receive message', msg );
                console.log('message envoyé à un')
            } else {
                io.emit('receive message', msg);
                console.log('message envoyé à tous')
            }
        });
        socket.on('refresh users',()=>{
            const users = userService.getUsers();
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
            const user2 = data.emet;
            dest.emit('invit rep',({ans :data.answer, user2 : user2}));
        });

        socket.on('result', (data) =>{
            const dest1 = messageService.getDest(data.emet)
            const dest2 = messageService.getDest(data.dest)
            dest1.emit('display res',(data.result));
            dest2.emit('display res',(data.result));
        });

    }

    async getUsersFromSpring() {
        try {
            const response = await axios.get('http://localhost:8083/users');
            userService.setUsers(response.data); // Affichage de la réponse
            userService.updateCards();
        } catch (error) {
            console.error(error); // Gestion des erreurs
        }

    };

    async getCardsFromSpring() {
        try {
            const response = await axios.get('http://localhost:8083/cards');
            userService.setCards(response.data); // Affichage de la réponse

        } catch (error) {
            console.error(error); // Gestion des erreurs
        }

    };

}

module.exports = new Controller();

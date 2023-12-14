const messageService = require('../services/MessageService');
const Message = require('../models/Message');

class MessageController {
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
            if (dest != null) {
                dest.emit('receive message', msg);
                console.log('message envoyé')
            } else {
                io.emit('receive message', msg);
            }
        });
    }
}

module.exports = new MessageController();

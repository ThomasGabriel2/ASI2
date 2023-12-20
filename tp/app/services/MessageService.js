const userService = require('./UserService')
class MessageService {
    constructor() {
        console.log(`new MessageService`);
    }
    getDest(id){
        let ret = null;
        if (id){
            ret = userService.getSocket(id);
        }
        return ret;
    };
}

module.exports = new MessageService();

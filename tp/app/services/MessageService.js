const userManager = require('./UserManager')
class MessageService {
    constructor() {
        console.log(`new UserService`);
    }
    getDest(id){
        let ret = null;
        if (id){
            ret = userManager.getSocket(id);
        }
        return ret;
    };
}

module.exports = new MessageService();

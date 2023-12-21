class User {
    constructor({ id, lastName, surName, pwd, cardList}) {
        this.id = id;
        this.lastName = lastName;
        this.surName = surName;
        this.pwd = pwd;
        this.cardList = cardList;
    }
}

module.exports = User;
class User {
    constructor({ id, lastName, surName, pwd}) {
        this.id = id;
        this.lastName = lastName;
        this.surName = surName;
        this.pwd = pwd;
    }
}

module.exports = User;
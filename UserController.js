module.exports = class UserController{
    fs = require('fs');
    users = require('./users.json');
    constructor(){
        this.fs.readFile("./users.json", (err, data)=>{
            if(err) throw err;
            this.users = JSON.parse(data);
        }
        );
    }

    getUser (id){
        return this.users.find(user=>user.id===id);
    }
    
    async updateUser(id, user){
        const index = this.users.findIndex(user=>user.id===id);
        this.users[index] = user;
        return this.users;
    }
}

const Entry = require('./Entry');  
 
class Listing {
 
 
    constructor(){
 
        //Array of entrys.
        this.data = Array();
 
        // all of the users.
        this.users = Array();
    }
    //check to see if user is already present
    userPresent(username){
        console.log("userPreesent called");
 
            if (this.users.length > 0) {
                for (var i =0; i < this.users.length; i++){
                    if (this.users[i] === username){
                        return true;
                    }
                }
            }
            return false;
    }
//check to see if id is present.
    idPresent(id){
        console.log("userPreesent called");
 
        if(this.data.length > 0){
            for (var i  = 0; i < this.data.length; i++){
                if (this.data[i].id === id){
                    return true;
                }
               
            }
        }
        return false;
    }
    //new user
    addUser(id,username){
        console.log("addUser called")
 
        for (var i = 0; i < this.data.length; i++){
            if (this.data[i].id === id){
                this.data[i].users.push(username);
                this.users.push(username);
                return;
            }
        }
    }
 
    //new id
    addID(id,username){
        console.log("new ID called");
        this.data.push(new Entry(id,username));
        this.users.push(username);
    }
    //FIND AND DELETE USERNAME FROM USERS ARRAY.
    deleteUser(username){
        console.log("deleteUser called");
 
        for (var i = 0; i < this.users.length; i++){
            if (this.users[1] === username){
                let tmp = this.users[i];
                this.users[i] = this.users[0];
                this.users[0] = tmp;
                this.users.shift();
                return;
            }
        }
    }
 
    deleteUserEntry(username){
        console.log("deleteUserEntry called");
        
        if (this.data.length > 0 && this.users.length > 0){
            //delete the entry when only 1 id and username is found/
            if(this.data.length === 1 && this.data[0].users.lenght === 1 && this.data[0].users === username){
                this.data.pop();
                this.user.pop();
            } else {
                for (var  i = 0; i < this.data.length; i++){
                    if (this.data[i].users.length > 0){
                        for (var j = 0; j < this.data[i].users.length; j++){
                            if (this.data[i].users[j] === username && this.data[i].users.length > 1){
                                let tmp = this.data[i].users[j];
                                this.data[i].users[j] = this.data[i].users[0];
                                this.data[i].users[0] = tmp;
 
                                let deleteUser = this.data[i].users.shift();
                                console.log("User deleted:" + deleteUser);
                                console.log(`Deleted user : ${deleteUser}`);
                                this.deleteUser(username);
                                return;
                            } else if (this.data[i].users.length === 1 && this.data[i].users[0] === username){
                                let tmp2 = this.data[i];
                                this.data[i] = this.data[0];
                                this.data[0] = tmp2;
 
                                let deletedID = this.data.shift();
                                console.log(`deleted id : ${deletedID}`);
                                this.deleteUser(username);
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
    // Entry with most players.
    sort() {
        if(this.data.length >= 2){
            for (var i = 0; i < this.data.length - 1; i++){
                for (var j = i + 1; j < this.data.length; j++){
                    if (this.data[i].users.length < this.data[j].users.length){
                        let tmp = this.data[i];
                        this.data[i] = this.data[j];
                        this.data[j] = tmp;
 
                    }
                }
 
            }
        }
    }
   
 
}
 
 
module.exports = Listing;
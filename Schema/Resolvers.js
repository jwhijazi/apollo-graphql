//Resolver: To deal with our Data:
const { users } = require('../data');
const resolvers = {
    Query:{
        getAllUsers(){
            return users;
        },
        getUser(parent, args){
            console.log(args);
            return users.find(u=> u.id == args['id']);
        }
    },
}

module.exports = {resolvers};
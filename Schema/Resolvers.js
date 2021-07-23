//Resolver: To deal with our Data:
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const { users } = require('../data');
const {insertStudent, addStudentToClass, getStudents, insertClass, getClasses, getClassById} = require('../db');

const saltRounds = 10;

const resolvers = {
    Query:{
        getAllUsers(){
            return users;
        },
        getUser(parent, args, {req, res}){
            console.log(req.userId);
            return users.find(u=> u.id == args['id']);
        },
        Students(){
            return getStudents();
        },
        Classes(){
            return getClasses();
        }
    },
    Student:{
        class(parent){
            return getClassById(parent.classId);
        }
    },

    Mutation:{
        register: async (_, {email, password, name}) =>{
            const hashedPass = await bcrypt.hash(password, saltRounds);
            //Save the user to the Database and return the result:
            return true;
        },
        login: (_, {email, password}, {res}) =>{
            if(email == 'jwhijazi' && password == '1234'){
                var key = process.env.ACCESS_TOKEN_SECRET;
                const user = users.find(u=> u.id == 101);
                //Generate Token and Save it in Cookie
                const accessToken = sign({userId: 101, name: user.name }, key, {expiresIn: '1h'});
                res.cookie('access-token', accessToken)
                
                user.token = null;
                user.token = accessToken;
                return user;
            }
            else
                return null;
        },

        addStudent: (_, {student}) =>{
            var id = insertStudent(student);
            return id;
        },

        addStudentToClass: (_, args) =>{
            var result = addStudentToClass(args['stuId'], args['classId']);
            return result;
        },

        addClass: (_,{schClass}) =>{
            return insertClass(schClass.class, schClass.section);
        }
    }
}

module.exports = {resolvers};
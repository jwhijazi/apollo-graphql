const { insertStudent, addStudentToClass, getStudents, getClassById} = require('../../db');

const resolvers = {
    Query: {
        Students() {
            return getStudents();
        },
        StudentsBy(_, args){
            const filter = args.filter;
            console.log(filter.name.eq);
            if(filter.name){
                if(filter.name.eq)
                    return getStudents().filter(s=> s.name.toLowerCase() == filter.name.eq.toLowerCase());
                if(filter.name.neq)
                    return getStudents().filter(s=> s.name.toLowerCase() != filter.name.neq.toLowerCase());
                if(filter.name.contains)
                    return getStudents().filter(s=> s.name.toLowerCase().includes(filter.name.contains.toLowerCase()));
            }
            return getStudents();
        }
    },
    Student: {
        class(parent) {
            return getClassById(parent.classId);
        }
    },

    Mutation: {
        addStudent: (_, { student }) => {
            var id = insertStudent(student);
            return id;
        },

        addStudentToClass: (_, args) => {
            var result = addStudentToClass(args['stuId'], args['classId']);
            return result;
        },
    }
}

module.exports = { resolvers };
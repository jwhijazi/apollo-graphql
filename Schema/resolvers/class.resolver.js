const { insertClass, getClasses, getStudentsInClass } = require('../../db');

const resolvers = {
    Query: {
        Classes() {
            return getClasses();
        }
    },

    SchoolClass:{
        students(parent){
            return getStudentsInClass(parent.id);
        }
    },

    Mutation: {
        addClass: (_, { schClass }) => {
            return insertClass(schClass.class, schClass.section);
        }
    }
}

module.exports = { resolvers };
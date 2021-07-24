const {DataStore } = require('notarealdb');
const store = new DataStore('./data');
const students = store.collection("students");
const classes = store.collection("classes");

function insertStudent(student){
    const id = students.create(student);
    return id;
}

function addStudentToClass(stuId, classId){
    var student = students.get(stuId);
    if(student){
        student.classId = classId;
        students.update(student);
        return 'Studented Added to class';
    }
    return 'Student Not found';
}

function insertClass(name, section){
    const id = classes.create({class: name, section: section});
    return id;
}

function getStudents(){
    var allStudents = students.list();
    return allStudents;
}

function getClasses(){
    return classes.list();
}

function getClassById(classId){
    return classes.get(classId);
}

function getStudentsInClass(classId){
    return students.list().filter(s=> s.classId == classId);
}

module.exports = {
    insertStudent,
    addStudentToClass,
    getStudents,
    insertClass,
    getClasses,
    getClassById,
    getStudentsInClass
}
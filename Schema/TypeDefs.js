const {  gql }  = require('apollo-server-express');
const { readFileSync } = require('fs');
const path = require("path");

//const schema = readFileSync(path.resolve(__dirname, 'schema.graphql')).toString('utf-8')
const usersSchema = readFileSync(path.resolve(__dirname, 'users.graphql')).toString('utf-8');
const studentsSchema = readFileSync(path.resolve(__dirname, 'student.graphql')).toString('utf-8');
const classSchema = readFileSync(path.resolve(__dirname, 'class.graphql')).toString('utf-8');

const schema = usersSchema + studentsSchema + classSchema;
const typeDefs = gql(schema);

module.exports = {typeDefs};
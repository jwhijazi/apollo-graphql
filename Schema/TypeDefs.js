const {  gql }  = require('apollo-server-express');
const { readFileSync } = require('fs');
const path = require("path");

const schema = readFileSync(path.resolve(__dirname, 'schema.graphql')).toString('utf-8')
const typeDefs = gql(schema);

module.exports = {typeDefs};
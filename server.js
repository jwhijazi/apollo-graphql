const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs } = require('./Schema/TypeDefs');
const { resolvers } = require('./Schema/Resolvers');

async function startApolloServer() {
    //Define Apollo Server
    const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
    await server.start();

    //Define Express
    const app = new express();
    server.applyMiddleware({app});

    await new Promise(resolve => app.listen({ port: 3000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);

    return { server, app };
}

startApolloServer();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const {verify} = require('jsonwebtoken');
const { typeDefs } = require('./Schema/TypeDefs');
const { resolvers } = require('./Schema/Resolvers');

async function startApolloServer() {
    //Define Apollo Server
    const server = new ApolloServer({ 
        typeDefs: typeDefs, 
        resolvers: resolvers,
        context: ({req, res}) => ({req, res})
    });
    await server.start();

    //Configure .env
    require('dotenv').config();

    //Define Express
    const app = express();

    //CORS
    app.use(cors());

    //Custom middleware:
    app.use((req, res, next) =>{
        // var token = req.headers['authorization'];
        // if(token)
        // {
        //     token = token.replace('bearer ', '');
        //     var key = process.env.ACCESS_TOKEN_SECRET;
        //     try {
        //         const jwtPayload = verify(token, key);
        //         req.userId = jwtPayload.userId; // This can be used in any of Mutations or Queries  
        //     } catch (error) {
        //         console.log("Token Not Valid");
        //     }
        // }
        next();
    });

    server.applyMiddleware({app});

    await new Promise(resolve => app.listen({ port: 3000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);

    return { server, app };
}

startApolloServer();
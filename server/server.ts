// #1 Import Express and Apollo Server
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// #3 Import GraphQL type definitions
import typeDefs from './modules/merchant/graphqlSchema';

// #4 Import GraphQL resolvers
import resolvers from './modules/merchant/resolvers';

import { UserSchema } from './models/User';
import { CartSchema } from './modules/merchant/models/Cart';
import Carts from './modules/merchant/datasources/carts';

import mongoose from 'mongoose';

export const mongodbConn = mongoose.createConnection(
    'mongodb://localhost:27017/test'
);
const UserModel = mongodbConn.model('User', UserSchema);
const CartModel = mongodbConn.model('Cart', CartSchema);

// #5 Initialize an Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        carts: new Carts(CartModel),
    }),
});

// #6 Initialize an Express application
const app = express();

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// #8 Set the port that the Express application will listen to
app.listen({ port: 3000 }, () => {
    // console.log(server.graphqlPath);
    console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
});

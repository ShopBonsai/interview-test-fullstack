// Import Express and Apollo Server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// Import Mongoose
const Mongoose = require('mongoose');

// Import Seed
const seed = require('./seed');

// Import GraphQL type definitions
const typeDefs = require('./modules/merchant/graphqlSchema');

// Import GraphQL resolvers
const resolvers = require('./modules/merchant/resolvers');

// Initialize an Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize an Express application
const app = express();

// Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// Use the same Promise as NodeJS
Mongoose.Promise = global.Promise;

// declare the deprecations
Mongoose.connect('mongodb://localhost/react-interview-test', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },(err) => {
  if (err) {
    return err;
  }
})

// call the seed function to import data
seed();

// Set the port that the Express application will listen to
app.listen({ port: 3000 }, () => {
  console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
});

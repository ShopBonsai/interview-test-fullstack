import 'reflect-metadata';
import { createSchema } from './utils/createSchema';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { intializeMongo } from './utils/typegoose.loader';
import { seedDatabase } from './utils/seed.data';

require('dotenv').config();

const init = async () => {
  const schema = await createSchema();

  await intializeMongo(process.env.DATABASE);
  await seedDatabase();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
    }),
  });

  const app = express();

  server.applyMiddleware({ app });

  app.listen({ port: 3000 }, () => {
    console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
  });
};

init();

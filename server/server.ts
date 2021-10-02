import 'reflect-metadata';
// #1 Import Express and Apollo Server
import express from 'express';
import * as path from 'path';
import { MerchantResolver } from './modules/resolvers/merchant.resolver';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { intializeMongo } from './utils/typegoose.loader';
import { seedDatabase } from './utils/seed.data';
import { OrderResolver } from './modules/resolvers/order.resolver';
import { AuthResolver } from './modules/resolvers/auth.resolver';
import { authChecker } from './modules/middleware/auth-middleware';

const init = async () => {
  const schema = await buildSchema({
    resolvers: [MerchantResolver, OrderResolver, AuthResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    authChecker,
  });

  await intializeMongo();
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

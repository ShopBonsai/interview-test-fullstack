import { ApolloServer } from "apollo-server-express";

import { authenticate } from "./middleware";
import schema from "./modules/schema";
import User from "./models/User";
import Log from "./models/Log";

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    await authenticate(req, res);
    const { user } = req;

    return {
      req,
      res,
      user,
      models: {
        User,
        Log,
      },
    };
  },
});

export default server;

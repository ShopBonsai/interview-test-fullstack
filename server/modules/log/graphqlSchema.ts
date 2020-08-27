import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server-express";

import resolvers from "./resolvers";

const typeDefs = gql`
  type LogHistory {
    userId: String
    count: Int
  }

  type Log {
    userId: String!
    createdAt: Int
  }

  type Query {
    logsByUserId(userId: String!): [Log]
    logHistoryByUserId(userId: String!): LogHistory
  }

  type Mutation {
    addLog(userId: String!): Log
  }
`;

const logSchema = makeExecutableSchema({ typeDefs, resolvers });

export default logSchema;

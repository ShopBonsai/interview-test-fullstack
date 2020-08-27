import { mergeSchemas, delegateToSchema } from "apollo-server-express";

import logSchema from "./log/graphqlSchema";
import userSchema from "./user/graphqlSchema";
import merchantSchema from "./merchant/graphqlSchema";
import linkedTypeDefs from "./linkedTypeDefs";

const schema = mergeSchemas({
  schemas: [userSchema, logSchema, merchantSchema, linkedTypeDefs],
  resolvers: {
    User: {
      logs: {
        fragment: `fragment UserFragment on User { _id }`,
        resolve: (user: any, __: any, context: any, info: any) => {
          return delegateToSchema({
            schema: logSchema,
            operation: "query",
            fieldName: "logsByUserId",
            args: {
              userId: user._id,
            },
            context,
            info,
          });
        },
      },
      logHistory: {
        fragment: `fragment UserFragment on User { _id }`,
        resolve: (user: any, __: any, context: any, info: any) => {
          return delegateToSchema({
            schema: logSchema,
            operation: "query",
            fieldName: "logHistoryByUserId",
            args: {
              userId: user._id,
            },
            context,
            info,
          });
        },
      },
    },
  },
});

export default schema;

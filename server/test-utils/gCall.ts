import 'reflect-metadata';
import { graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'type-graphql';
import { createSchema } from '../utils/createSchema';
import jwt from 'jsonwebtoken';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: string;
}

let schema: GraphQLSchema;

const token = (userId) => {
  // FORCING WRONG JWT TO TEST AUTH MIDDLEWARE
  if (userId === 'force_error') {
    return {
      authorization: `Bearer ${jwt.sign({ userId }, 'wrong key')}`,
    };
  }

  return {
    authorization: `Bearer ${jwt.sign({ userId }, process.env.APP_SECRET)}`,
  };
};

export const gCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        headers: userId ? token(userId) : {},
      },
    },
  });
};

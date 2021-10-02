import 'reflect-metadata';
import { graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'type-graphql';
import { createSchema } from '../utils/createSchema';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils/consts';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: string;
}

let schema: GraphQLSchema;

const token = (userId) => {
  return {
    authorization: `Bearer ${jwt.sign({ userId }, APP_SECRET)}`,
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

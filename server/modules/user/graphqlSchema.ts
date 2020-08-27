import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "apollo-server-express";

import resolvers from "./resolvers";

const typeDefs = gql`
  type UserProfile {
    name: String!
    givenName: String
    familyName: String
  }

  type User {
    _id: ID!
    email: String
    profile: UserProfile
    role: String
  }

  type Query {
    me: User
    users: [User!]
  }

  type Mutation {
    loginAdmin(email: String!, password: String!): User
  }
`;

const userSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default userSchema;

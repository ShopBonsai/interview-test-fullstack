import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server-express";

import resolvers from "./resolvers";

const typeDefs = gql`
  type Merchant {
    index: Int
    guid: String
    logo: String
    dateCreated: String
    publishedState: Boolean
    brands: [String]
    merchant: String
    products: [Product]
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    publishedDate: String
    publishedBy: MerchantUser
    companyDescription: String
  }
  type Product {
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
  }
  type MerchantUser {
    userId: String
  }
  type Query {
    merchants: [Merchant!]!
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
  }
`;

const merchantSchema = makeExecutableSchema({ typeDefs, resolvers });

export default merchantSchema;

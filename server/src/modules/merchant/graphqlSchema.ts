import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Merchant {
    index: Int
    guid: String
    logo: String
    dateCreated: String
    publishedState: Boolean
    brands: [Brand]
    merchant: String
    products: [Product]
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    publishedDate: String
    publishedBy: User
    companyDescription: String
  }

  input MerchantInput {
    logo: String
    publishedState: Boolean
    merchant: String
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
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
    brand:[Brand]
  }
  type User {
    userId: String
    firstName: String
    lastName: String
    email: String
    role: String
  }

  type Brand {
    name: String!
    merchantId: ID!
    merchants: [Merchant]
  }
  type Query {
    merchants: [Merchant!]!
    products: [Product!]!
    brands: [Brand!]!
  }
  type Mutation {
    createMerchant(input: MerchantInput!): Merchant
    editMerchant(publishedState: Boolean!): Merchant
  }
`;

export { typeDefs };

const { gql } = require('apollo-server-express');

/*
 * 🚨
 * PROBLEM.
 * NOTE: There is a problem as the items in the database are visually described differently
 * ie. [dateCreated => created_at], [publishedState => published_state]
 */
const typeDefs = gql`
  type Merchant {
    index_val: Int
    guid: String
    logo: String
    created_at: String
    publishedState: Boolean
    brands: [String]
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
  type User {
    userId: String
  }
  type Query {
    merchants: [Merchant!]!
    getAllMerchants: [Merchant!]!
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
  }
`;

module.exports = typeDefs;

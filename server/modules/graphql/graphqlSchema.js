const { gql } = require('apollo-server-express');

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
  type CartItem {
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    quantityInCart: Int
    image: String
  }
  input CartItemInput {
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    quantityInCart: Int
    image: String
  }
  input ProductInput {
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
    email: String
    googleId: String
    imageUrl: String
    name: String
    cartItems: [CartItem]
    likedItems: [Product]
  }
  input UserInput {
    email: String!
    googleId: String!
    imageUrl: String!
    name: String!
    cartItems: [CartItemInput]!
    likedItems: [ProductInput]
  }
  type Query {
    merchants: [Merchant!]!
    users: [User!]!
    user(input: String): User!
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
    updateUser(user: UserInput!): User
    createUser(user: UserInput!): User
  }
`;

module.exports = typeDefs;
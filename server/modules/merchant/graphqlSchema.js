const { gql } = require('apollo-server-express')

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
  type User {
    id: ID!
    name: String
    birthday: String
    address: Address
    image: String
  }
  type Address {
    street: String
    city: String
    province: String
    country: String
    postal: String
  }
  type Query {
    merchants: [Merchant!]!
    products(name: String, color: String, size: String): [Product!]!
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
  }
`

module.exports = typeDefs
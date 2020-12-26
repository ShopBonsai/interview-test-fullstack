import { gql } from 'apollo-server-express';

export default gql`
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
        userId: String
    }
    type Query {
        merchants: [Merchant!]!
        users: [User]
        cart: CartResponse
    }
    type CartItem {
        id: String
        name: String
        image: String
        price: Float
        quantity: Int
    }
    type Cart {
        userId: String
        items: [CartItem]
    }
    type CartResponse {
        success: Boolean!
        message: String
        cart: Cart
    }
    type Mutation {
        addToCart(productId: String!, quantity: Int!): CartResponse
        updateCart(productId: String!, quantity: Int!): CartResponse
    }
`;

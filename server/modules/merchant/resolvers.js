const { merchants } = require('../../../mockMerchantData');
const { GraphQLID, GraphQLString } = require('graphql');
const {
  GET_ALL_MERCHANTS,
  GET_MERCHANT_PRODUCTS,
  FIND_MERCHANT,
} = require('../Queries/Merchant');

const { GET_ALL_PRODUCTS_IN_CART } = require('../Queries/UserCart.ts');

// Merchants
const resolvers = {
  Query: {
    merchants: GET_ALL_MERCHANTS,
    findMerchant: FIND_MERCHANT,
    getAllProductsInCart: GET_ALL_PRODUCTS_IN_CART,
  },
  Merchant: {
    products: GET_MERCHANT_PRODUCTS,
  },
};

module.exports = resolvers;

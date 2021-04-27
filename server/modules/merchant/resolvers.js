const { merchants } = require('../../../mockMerchantData');
const { GraphQLID, GraphQLString } = require('graphql');
const {
  GET_ALL_MERCHANTS,
  GET_MERCHANT_PRODUCTS,
  FIND_MERCHANT,
} = require('../Queries/Merchant');

// Merchants
const resolvers = {
  Query: {
    merchants: GET_ALL_MERCHANTS,
    findMerchant: FIND_MERCHANT,
  },
  Merchant: {
    products: GET_MERCHANT_PRODUCTS,
  },
};

module.exports = resolvers;

const { merchants } = require('../../../mockMerchantData');
const { GraphQLID, GraphQLString } = require('graphql');
const {
  GET_ALL_MERCHANTS,
  GET_MERCHANT_PRODUCTS,
} = require('../Queries/Merchant');

// Merchants
const resolvers = {
  Query: {
    merchants: () => merchants,
    getAllMerchants: GET_ALL_MERCHANTS,
  },
  Merchant: {
    products: GET_MERCHANT_PRODUCTS,
  },
};

module.exports = resolvers;

const { merchants } = require('../../../mockMerchantData');
const { GraphQLID, GraphQLString } = require('graphql');
const { GET_ALL_MERCHANTS } = require('../Queries/Merchant.ts');

// Merchants
const resolvers = {
  Query: {
    merchants: () => merchants,
    getAllMerchants: GET_ALL_MERCHANTS,
  },
};

module.exports = resolvers;

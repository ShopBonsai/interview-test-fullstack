const { merchants } = require("../../../mockMerchantData")

const resolvers = {
  Query: {
    merchants: () => merchants
  },
};

module.exports = resolvers;
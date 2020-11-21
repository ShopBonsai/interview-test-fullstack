const { merchants } = require("../../../mockMerchantData")

const resolvers = {
  Query: {
    merchants: () => merchants,
    cart: () => [],
  },
};

module.exports = resolvers;
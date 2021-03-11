const { merchants } = require("../../../mockMerchantData")

const merchantsByGuid = merchants.reduce((acc, merchant) => ({ [merchant.guid]: merchant, ...acc }), {});

const resolvers = {
  Query: {
    merchants: () => merchants,
    merchant: (_, { guid }) => {
      return merchantsByGuid[guid]
    },
  },
};

module.exports = resolvers;
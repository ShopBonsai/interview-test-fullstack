/* eslint-disable require-await */
const { merchants } = require("../../mockMerchantData");

const resolvers = {
  Mutation: {
    favourite: async (_, favouriteData) => {
      console.log(favouriteData);
    },
    notification: async (_, notificationData) => {
      console.log(notificationData);
    },
    order: async (_, orderData) => {
      console.log(orderData);
    },
  },
  Query: {
    merchants: () => merchants,
  },
};

module.exports = resolvers;

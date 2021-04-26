import { merchants as Merchants } from "../../mockMerchantData"

const resolvers = {
  Query: {
    merchants: (_: any, args: any, { models }: any) => {
      return Merchants
    }
  },
  Mutation: {
    createMerchant: async (_: any, { input }: any, { models }: any) => {
      return models.Merchant.create(input)
    }

  }
};

module.exports = resolvers;
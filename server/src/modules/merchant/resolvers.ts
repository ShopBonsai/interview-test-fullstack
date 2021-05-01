const resolvers = {
  Query: {
    merchants: (_: any, args: any, { models }: any) => {
      return models.Merchant.find({}).exec();
    },
    products: (_: any, { merchant: belongsToMerchant, sortBy }: any, { models }: any) => {

      if (!belongsToMerchant) {
        if (sortBy == 'merchant') {
          return models.Product.find({}, null, { sort: { belongsToMerchant: 1 } }).exec();
        }
        if (sortBy == 'brand') {
          return models.Product.find({}, null, { sort: { belongsToBrand: 1 } }).exec();
        }
      }

      if (sortBy == 'merchant') {
        return models.Product.find({ belongsToMerchant }, null, { sort: { belongsToMerchant: 1 } }).exec();
      }
      if (sortBy == 'brand') {
        return models.Product.find({ belongsToMerchant }, null, { sort: { belongsToBrand: 1 } }).exec();
      }

    },
    brands: (_: any, args: any, { models }: any) => {
      return models.Product.find({}).exec();
    },

  },
  Mutation: {
    createMerchant: async (_: any, { input }: any, { models }: any) => {
      return models.Merchant.create(input);
    },
  },

  Product: {
    brand(product: any, _: any, { models }: any) {
      return models.Brand.findOne({ _id: product.belongsToBrand })
    },
    merchant(product: any, _: any, { models }: any) {
      return models.Merchant.findOne({ _id: product.belongsToMerchant })
    },
  },
};

export { resolvers };

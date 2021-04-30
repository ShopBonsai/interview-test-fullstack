const resolvers = {
  Query: {
    merchants: (_: any, args: any, { models }: any) => {
      return models.Merchant.find({}).exec();
    },
    products: (_: any, args: any, { models }: any) => {
      return models.Product.find({}).exec();
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

  Merchant: {
    products({ brands }: any, _: any, { models }: any) {
      const brandIds = brands.map((brand: any) => brand._id);
      return models.Product.find({ belongsToBrand: { $in: brandIds } });
    },
  },
};

export { resolvers };

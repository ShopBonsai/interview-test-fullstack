const { merchants } = require("../../mockMerchantData");
const User = require("../../models/UserModel");

const resolvers = {
  Query: {
    merchants: () => merchants
  },
  Mutation: {
    likeProduct: async (_, { userId, productId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { userId },
        { $addToSet: { likedProducts: { id: productId } } },
        { new: true }
      );
      return updatedUser;
    }
  }
};

module.exports = resolvers;

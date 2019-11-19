const { merchants } = require("../../mockMerchantData");
const User = require("../../models/UserModel");

const resolvers = {
  Query: {
    merchants: () => merchants
  },
  Mutation: {
    likeProduct: async (_, { userId, productId }) => {
      console.log(`likeProduct(${userId}, ${productId})`);
      const updatedUser = await User.findOneAndUpdate(
        { userId },
        { $addToSet: { likedProducts: {id: productId}}},
        { new: true }
      );
      console.log("********************");
      console.log(updatedUser);
      console.log("********************");
      return updatedUser;
    }
  }
};

module.exports = resolvers;

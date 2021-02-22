const Merchant = require('../../models/merchant');
const User = require('../../models/user');

const resolvers = {
  Query: {
    merchants: async () => {
      const merchants = await Merchant.find({});
      return merchants
    },
    user: async (_, { userId })=> {
      const user = await User.findOne({ userId });
      return user
    }
  },
  Mutation: {
    setLikedItem: async (_, { productId, userId }) => {
      const updatedUser = await User.findOneAndUpdate({ userId }, { $addToSet: { likes: [productId] }})
      return {
        isLiked: updatedUser.userId === userId
      }
    }
  }
};

module.exports = resolvers;

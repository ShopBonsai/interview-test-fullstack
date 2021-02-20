const Merchant = require('../../models/merchant');
const User = require('../../models/user');

const resolvers = {
  Query: {
    merchants: async () => {
      const merchants = await Merchant.find({});
      return merchants
    },
    user: async (_, {userId})=> {
      const user = await User.findOne({userId});
      return user
    }
  },
};

module.exports = resolvers;

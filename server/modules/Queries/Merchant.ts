const { GraphQLList } = require('graphql');
// const MerchantType = require('../TypeDefs/MerchantType');
const db = require('../../db/connect');

const GET_ALL_MERCHANTS = {
  // type: new GraphQLList(MerchantType),
  resolve() {
    return {
      id: 23,
      index: 23,
    };
  },
  //   return db('merchants')
  //     .then(res => res)
  //     .error(err => err);
  // },
};

module.exports = { GET_ALL_MERCHANTS };

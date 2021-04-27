const { GraphQLList } = require('graphql');
// const MerchantType = require('../TypeDefs/MerchantType');
const db = require('../../db/connect');

const GET_ALL_MERCHANTS = async () => {
  const res = await db('merchants');
  console.log('----------------------------------');
  console.log(res);
  return res;
};

module.exports = { GET_ALL_MERCHANTS };

const Fuse = require('fuse.js')
const { merchants } = require("../../../mockMerchantData")

const resolvers = {
  Query: {
    merchants: () => merchants,
    search: (parent, args) => {
      const { type, text } = args

      let keys = []

      switch (type) {
        case 'PRODUCT':
          keys = ['products.name']
        break;
        case 'BRAND':
          keys = ['brands']
        break;
        case 'MERCHANT':
          keys = ['merchant']
        break;
        default:
          keys = ['products.name','brands', 'merchant']
        break
      }

      const options = {
        includeScore: true,
        keys
      }

      const fuse = new Fuse(merchants, options)
      const results = fuse.search(text)

      return results
          .flatMap((result) => result.item)
    }
  },
};

module.exports = resolvers;

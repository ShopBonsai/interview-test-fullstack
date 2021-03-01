const { merchants } = require('../../mocks/mockMerchantData')

const resolvers = {
  Query: {
    merchants: () => merchants,
    products: (_, filters) => {
      const products = [].concat.apply([], merchants.map(merchant => merchant.products))
      return products.filter(product => Object.keys(filters).every(f => product[f].toUpperCase().includes(filters[f].toUpperCase())))
    },
  }
}

module.exports = resolvers
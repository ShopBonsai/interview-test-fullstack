const merchants = require('../../mocks/mockMerchantData')
const cart = require('../../mocks/mockCartData')

const products = [].concat.apply([], merchants.map(merchant => merchant.products))

const resolvers = {
  Query: {
    // Query all merchant data
    merchants: () => merchants,

    // Query all products, filters for name or product size optionally applied
    products: (_, filters) => {
      return products.filter(product => Object.keys(filters).every(f => product[f].toUpperCase().includes(filters[f].toUpperCase())))
    },

    // Query cart data
    cart: () => cart
  },
  Mutation: {
    // Add new item to cart
    addToCart: (_, { productId }) => {
      cart.push(products.find(product => product.id === productId))
      return cart
    },

    // Remove item from cart
    removeFromCart: (_, { productId }) => {
      const productIndex = cart.findIndex(product => product.id === productId)
      const product = cart[productIndex]
      cart.splice(productIndex, 1)
      return cart
    }
  }
}

module.exports = resolvers
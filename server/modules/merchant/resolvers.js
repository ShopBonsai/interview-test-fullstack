const { merchants } = require('../../../mockMerchantData');

const products = merchants.reduce((prev, merchant) => {
  if (!merchant.products) return prev;
  return [...prev, ...merchant.products];
}, []);

const normalizedProducts = {
  ids: products.map((product) => product.id),
  data: products.reduce((prev, product) => ({ ...prev, [product.id]: product }), {}),
};

const resolvers = {
  Query: {
    merchants: () => merchants,
    product: (_, { id }) => {
      if (!normalizedProducts.ids.some((productId) => productId === id)) return null;
      return normalizedProducts.data[id];
    },
  },
};

module.exports = resolvers;

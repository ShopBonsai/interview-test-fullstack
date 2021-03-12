const { merchants } = require("../../../mockMerchantData")

const merchantsByGuid = merchants.reduce((acc, merchant) => ({ [merchant.guid]: merchant, ...acc }), {});

const resolvers = {
  Query: {
    merchants: () => merchants,
    merchant: (_, { guid }) => {
      return merchantsByGuid[guid]
    },
  },
  Mutation: {
    /* TODO: Restrict merchant updates by current user */
    editMerchantWithGuid: (_, {
      guid,
      merchant: merchantName,
      contactEmail,
      phone,
      address,
      companyDescription,
    }) => {
      const merchant = merchantsByGuid[guid];
      merchant.merchant = merchantName;
      merchant.contactEmail = contactEmail;
      merchant.phone = phone;
      merchant.address = address;
      merchant.companyDescription = companyDescription;
      return merchant;
    }
  }
};

module.exports = resolvers;
import { merchants } from "../../../mockMerchantData";

const resolvers = {
  Query: {
    merchants: () => merchants
  }
};

export default resolvers;

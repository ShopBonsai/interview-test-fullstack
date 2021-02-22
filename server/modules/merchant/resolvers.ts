import { Resolver, Query } from "type-graphql";
import Merchant from "../../db/entity/Merchant";
import Product from "../../db/entity/Product";

@Resolver()
class MerchantResolver {
  @Query(() => [Merchant])
  merchants(): Promise<Merchant[]> {
    return Merchant.find({ relations: ["brands", "products"] });
  }
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find();
  }
}

export default MerchantResolver;

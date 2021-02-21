import { Resolver, Query } from "type-graphql";
import Merchant from "../../db/entity/Merchant";

@Resolver()
class MerchantResolver {
  @Query(() => [Merchant])
  merchants(): Promise<Merchant[]> {
    return Merchant.find({ relations: ["brands", "products"] });
  }
}

export default MerchantResolver;

import { Merchant } from "../../entity/Merchant";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Cart, CartInput } from "../../entity/Cart";
@Resolver()
export class MerchantResolver {
  @Query(() => [Merchant])
  merchants() : Promise<Merchant[]>{
    return Merchant.find<Merchant>()
  }
}

@Resolver()
export class CartResolver {
  @Query(() => [Cart])
  merchants() : Promise<Cart[]>{
    return Merchant.find<Cart>()
  }

  @Mutation(() => Cart)
  async createCart(@Arg("data") data: CartInput): Promise<Cart> {
    const cart = Cart.create(data);
    return cart.save();
  }
}
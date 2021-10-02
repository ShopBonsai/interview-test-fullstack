import { Merchant, MerchantModel } from '../entities/merchant';
import { Arg, Query, Resolver, Int } from 'type-graphql';

@Resolver((of) => Merchant)
export class MerchantResolver {
  @Query((returns) => [Merchant], { description: 'Get all the recipes from around the world ' })
  async merchants(
    @Arg('limit', (type) => Int, { nullable: true, defaultValue: 20 }) limit?: number,
    @Arg('offset', (type) => Int, { nullable: true, defaultValue: 0 }) offset?: number,
  ): Promise<Merchant[]> {
    return await MerchantModel.find({}).limit(limit).skip(offset);
  }
}

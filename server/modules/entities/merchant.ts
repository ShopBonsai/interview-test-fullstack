import { User } from './user';
import { Product } from './product';
import { Field, ObjectType, Int } from 'type-graphql';
import { getModelForClass, prop as Property, Ref } from '@typegoose/typegoose';

@ObjectType({ description: 'Object representing a merchant' })
export class Merchant {
  @Field((type) => [Int])
  @Property({ required: true })
  index: string;

  @Field()
  @Property({ required: true })
  guid: string;

  @Field((type) => [Int])
  @Property({ required: true })
  logo: string;

  @Field()
  @Property({ required: true })
  dateCreated: string;

  @Field((type) => Int)
  @Property({ required: true })
  publishedState: number;

  @Field((type) => [String])
  @Property({ type: () => [String], required: true })
  brands: string[];

  @Field()
  @Property({ required: true })
  merchant: string;

  @Field((type) => [Product])
  @Property({ type: () => Product, default: [] })
  products: Product[];

  @Field()
  @Property({ required: true })
  commissionFee: string;

  @Field()
  @Property({ required: true })
  contactEmail: string;

  @Field()
  @Property({ required: true })
  phone: string;

  @Field()
  @Property({ required: true })
  address: string;

  @Field()
  @Property({ default: new Date(), required: true })
  publishedDate: string;

  @Field((type) => User)
  @Property({ type: () => User, required: true })
  publishedBy: string;

  @Field()
  @Property({ required: true })
  companyDescription: string;
}

export const MerchantModel = getModelForClass(Merchant);

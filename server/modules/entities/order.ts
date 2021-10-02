import { Product } from './product';
import { Field, ObjectType, FieldResolver, Root } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

@ObjectType({ description: 'Object representing a merchant' })
export class Order {
  @Field()
  @Property({ required: true })
  guid: string;

  @Field((type) => [Product])
  @Property({ type: () => Product, default: [] })
  products: Product[];

  @Field()
  @Property({ required: true })
  userId: string;

  @Field()
  @Property({ required: true })
  total: string;
}

export const OrderModel = getModelForClass(Order);

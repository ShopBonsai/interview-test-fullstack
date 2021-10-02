import { Order } from './order';
import { Product } from './product';
import { Field, InputType, Int } from 'type-graphql';

@InputType({})
export class ProductInput {
  @Field({ nullable: true })
  readonly id: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  image: string;
}

@InputType({ description: 'Object representing a merchant' })
export class OrderInput {
  @Field((type) => [ProductInput])
  products: ProductInput[];

  @Field({ nullable: true })
  userId: string;
}

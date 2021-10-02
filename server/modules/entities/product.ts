import { Field, ObjectType, Int } from 'type-graphql';
import { prop as Property } from '@typegoose/typegoose';

@ObjectType({ description: 'Object representing a merchant' })
export class Product {
  @Field()
  readonly id: string;

  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  @Property({ required: true })
  price: number;

  @Field()
  @Property({ nullable: true })
  description: string;

  @Field()
  @Property({ nullable: true })
  color: string;

  @Field()
  @Property({ nullable: true })
  size: string;

  @Field()
  @Property({ required: true })
  quantity: number;

  @Field()
  @Property({ required: true })
  image: string;

  @Field((type) => [Int])
  @Property({ nullable: true })
  belongsToBrand: number;
}

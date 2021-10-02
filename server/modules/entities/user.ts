import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

@ObjectType({ description: 'Object representing a merchant' })
export class User {
  @Field()
  @Property({ nullable: true })
  userId: string;

  @Field()
  @Property({ nullable: true })
  name: string;

  @Field()
  @Property({ nullable: true, unique: true })
  email: string;

  @Field()
  @Property({ nullable: true })
  password: string;

  @Field()
  token: string;
}

export const UserModel = getModelForClass(User);

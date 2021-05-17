
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Product } from "./Product";

@Entity()
@ObjectType()
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id: number;

    @Column()
    @Field(() => String)
    sessionId: string;

    @Column({ type: 'jsonb' })
    @Field(() => [Product])
    products: object[];
}



@InputType()
export class CartInput {
    @Field(() => ID)
    id: number;

    @Field(() => String)
    sessionId: string;

    @Field(() => [CartItemInput])
    products: CartItemInput[];
}

@InputType()
export class CartItemInput {
    @Field(() => String)
    MerchantId: string;

    @Field(() => String)
    ProducttId: string;

    @Field(() => Number)
    quantity: number;


}
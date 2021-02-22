import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IOrder {
  id: number;
  productId: string;
  quantity: number;
  totalPrice: number;
}

@Entity()
export default class Order extends BaseEntity implements IOrder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: string;

  @Column()
  quantity!: number;

  @Column()
  totalPrice!: number;
}

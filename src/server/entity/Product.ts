// Initially I was planning to strore the products in a separate table but based on the current product-brand relationship shape, document type or jsob seems more appropriate, 
//keepign this to facilitate evaluation

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// export enum productSize {
//     S,
//     M,
//     L
// }

// @Entity()
// export class Product {

//     @PrimaryGeneratedColumn("uuid")
//     id: number;

//     @Column()
//     belongsToBrand: number;

//     @Column()
//     name: string;

//     @Column()
//     price: number;

//     @Column()
//     description: string;

//     @Column()
//     color: string;

//     @Column({ type: "enum", enum: productSize })
//     size: string;

//     @Column()
//     quantity: string;

//     @Column()
//     image: string;
// }

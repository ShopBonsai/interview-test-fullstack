import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Merchant {

    @PrimaryGeneratedColumn("uuid")
    guid: number;

    @Column()
    index: number;

    @Column()
    logo: string;

    // this didn't work out of the box, I think some data conversion might be required since current timestamps are string
    // @Column({ type: 'timestamp', nullable: true }) 
    // dateCreated: Date; 

    @Column()
    dateCreated: string;

    @Column()
    publishedState: boolean;

    @Column({ type: 'jsonb' })
    brands: string[];

    @Column({ type: 'jsonb' })
    products: object[];

    @Column()
    merchant: string;

    @Column()
    commissionFee: string;

    @Column()
    contactEmail: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    publishedDate: string;

    @Column({ type: 'jsonb' })
    publishedBy: Object;

    @Column()
    companyDescription: string;
}

//module.exports = Merchant;
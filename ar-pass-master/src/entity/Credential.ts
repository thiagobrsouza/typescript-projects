import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./Customer";
import { Group } from "./Group";

@Entity()
export class Credential {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    address: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({nullable: true})
    notes: string;

    @ManyToOne(() => Customer, customer => customer.credentials)
    customer: Customer;

    @ManyToOne(() => Group, group => group.credentials)
    group: Group;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(title: string, address: string, username: string, password: string, notes: string, customer: Customer, group: Group) {
        this.title = title;
        this.address = address;
        this.username = username;
        this.password = password;
        this.notes = notes;
        this.customer = customer;
        this.group = group;
    }
}
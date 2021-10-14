import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Credential } from "./Credential";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    contactName: string;

    @Column()
    contactEmail: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Credential, credential => credential.customer)
    credentials: Credential[];

    constructor (name: string, contactName: string, contactEmail: string) {
        this.name = name;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
    }

}
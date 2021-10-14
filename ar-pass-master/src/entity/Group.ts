import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Credential } from "./Credential";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Credential, credential => credential.group)
    credentials: Credential[];

    constructor(name: string) {
        this.name = name;
    }

}
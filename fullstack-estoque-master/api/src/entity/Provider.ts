import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Provider {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  name: string;

  @Column({unique: true, nullable: false})
  cnpj: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Product, product => product.provider)
  products: Product[];

  constructor(name: string, cnpj: string) {
    this.name = name;
    this.cnpj = cnpj;
  }

}
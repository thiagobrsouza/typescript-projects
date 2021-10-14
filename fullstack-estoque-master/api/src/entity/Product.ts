import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Provider } from "./Provider";

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  name: string;

  @Column({nullable: false})
  amount: number;

  @Column({nullable: false})
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Provider, provider => provider.products)
  provider: Provider;

  constructor(name: string, amount: number, price: number, provider: Provider) {
    this.name = name;
    this.amount = amount;
    this.price = price;
    this.provider = provider;
  }

}
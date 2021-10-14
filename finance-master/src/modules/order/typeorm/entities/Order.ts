import Customer from "@modules/customers/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import OrdersProducts from "./OrdersProducts";

@Entity('order')
class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer) // muitas ordens para um cliente
    @JoinColumn({name: 'customer_id'}) // nome da coluna que faz join
    customer: Customer;

    @OneToMany(() => OrdersProducts, order_products => order_products.order, {
        cascade: true,
    })
    orders_products: OrdersProducts[];

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

}

export default Order;

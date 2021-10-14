import Product from "@modules/products/typeorm/entities/Product";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./Order";

@Entity('orders_products')
class OrdersProducts {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.orders_products) // muitas ordens para orders-products
    @JoinColumn({name: 'order_id'}) // nome da coluna que faz join
    order: Order;

    @ManyToOne(() => Product, product => product.orders_products) // muitos produtos para orders-products
    @JoinColumn({name: 'product_id'}) // nome da coluna que faz join
    product: Product;

    @Column()
    order_id: string;

    @Column()
    product_id: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

}

export default OrdersProducts;

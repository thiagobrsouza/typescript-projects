import CustomerRepository from "@modules/customers/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import { OrderRepository } from "../typeorm/repositories/OrderRepository";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({customer_id, products}: IRequest): Promise<Order> {
        const orderRepository = getCustomRepository(OrderRepository);
        const customerRepository = getCustomRepository(CustomerRepository);
        const productRepository = getCustomRepository(ProductRepository);

        // 1. verificar se o cliente existe
        const customerExists = await customerRepository.findById(customer_id);
        if (!customerExists) {
            throw new AppError('Could not find any customer with the given id');
        }

        // 2. verificar se os produtos existem
        const existsProducts = await productRepository.findAllByIds(products);
        if (!existsProducts.length) {
            throw new AppError('Could not find any product with the given ids.');
        }

        // 3. verifica se realmente todos os produtos são existentes
        const existsProductsIds = existsProducts.map(product => product.id);
        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );
        if (checkInexistentProducts.length) {
            throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`,);
        }

        // 4. verifica a quantidade
        const quantityAvailable = products.filter(
            product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
        );
        if(quantityAvailable.length) {
            throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`);
        }

        // 5. enfim montamos o objeto que queremos salvar
        const serializedProducts = products.map(
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProducts.filter(p => p.id === product.id)[0].price,
            })
        );

        const order = await orderRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const {orders_products} = order;

        const updatedProductQuantity = orders_products.map(
            product => ({
                id: product.product_id,
                quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
            })
        );

        await productRepository.save(updatedProductQuantity);

        return order;

    }
}

export default CreateOrderService;

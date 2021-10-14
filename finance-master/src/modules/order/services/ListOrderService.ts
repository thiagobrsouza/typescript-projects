import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import { OrderRepository } from "../typeorm/repositories/OrderRepository";

class ListOrderService {
    public async execute(): Promise<Order[]> {
        const orderRepository = getCustomRepository(OrderRepository);
        const orders = orderRepository.find();
        return orders;
    }
}

export default ListOrderService;

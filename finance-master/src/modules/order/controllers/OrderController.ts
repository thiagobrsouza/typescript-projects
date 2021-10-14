import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ListOrderService from "../services/ListOrderService";
import ShowOrderService from "../services/ShowOrderService";

export default class OrderController {

    public async index(request: Request, response: Response): Promise<Response> {
        const listOrders = new ListOrderService();
        const orders = await listOrders.execute();
        return response.json(orders);
    }

    // metodo para listar um pedido
    public async show(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const showOrder = new ShowOrderService();
        const order = await showOrder.execute({id});
        return response.json(order);
    }

    // metodo para criar um produto
    public async create(request: Request, response: Response): Promise<Response> {
        const {customer_id, products} = request.body;
        const createOrder = new CreateOrderService();
        const order = await createOrder.execute({customer_id, products});
        return response.json(order);
    }

}

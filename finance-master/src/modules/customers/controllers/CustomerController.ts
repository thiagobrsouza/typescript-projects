import { Request, response, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomerController {

    // metodo para listar clientes
    public async index(request: Request, response: Response): Promise<Response> {
        const listCustomers = new ListCustomerService();
        const customers = await listCustomers.execute();
        return response.json(customers);
    }

    // metodo para listar um cliente
    public async show(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const showCustomer = new ShowCustomerService();
        const customer = await showCustomer.execute({id});
        return response.json(customer);
    }

    // metodo para criar um cliente
    public async create(request: Request, response: Response): Promise<Response> {
        const {name, email} = request.body;
        const createCustomer = new CreateCustomerService();
        const customer = await createCustomer.execute({name, email});
        return response.json(customer);
    }

    // metodo para atualizar cliente
    public async update(request: Request, response: Response): Promise<Response> {
        const {name, email} = request.body;
        const { id } = request.params;
        const updateCustomer = new UpdateCustomerService();
        const customer = await updateCustomer.execute({id, name, email});
        return response.json(customer);
    }

    // metodo para excluri um cliente
    public async delete(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteCustomer = new DeleteCustomerService();
        await deleteCustomer.execute({id});
        return response.json([]);
    }
}

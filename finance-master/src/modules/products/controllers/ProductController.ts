import { Request, response, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";

export default class ProductController {

    // metodo para listar produtos
    public async index(request: Request, response: Response): Promise<Response> {
        const listProducts = new ListProductService();
        const products = await listProducts.execute();
        return response.json(products);
    }

    // metodo para listar um produto
    public async show(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const showProduct = new ShowProductService();
        const product = await showProduct.execute({id});
        return response.json(product);
    }

    // metodo para criar um produto
    public async create(request: Request, response: Response): Promise<Response> {
        const {name, price, quantity} = request.body;
        const createProduct = new CreateProductService();
        const product = await createProduct.execute({name, price, quantity});
        return response.json(product);
    }

    // metodo para atualizar produto
    public async update(request: Request, response: Response): Promise<Response> {
        const {id, name, price, quantity} = request.body;
        const updateProduct = new UpdateProductService();
        const product = await updateProduct.execute({id, name, price, quantity});
        return response.json(product);
    }

    // metodo para excluri um produto
    public async delete(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteProduct = new DeleteProductService();
        await deleteProduct.execute({id});
        return response.json([]);
    }
}

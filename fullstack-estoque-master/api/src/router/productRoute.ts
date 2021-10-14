import { Router } from "express";
import { Product } from "../entity/Product";
import { ProductService } from "../service/ProductService";

export const productRoute = Router();
const productService = new ProductService();

/**
 * rota para salvar
 */
productRoute.post('/', async (req, res) => {
  const {name, amount, price, provider} = req.body;
  const product = new Product(name, amount, price, provider);
  try {
    const newProduct = await productService.save(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

/**
 * rota listar todos
 */
productRoute.get('/', async (req, res) => {
  const list = await productService.findAll();
  res.status(200).json(list);
});

/**
 * rota para buscar um
 */
productRoute.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

/**
 * rota para editar
 */
productRoute.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {name, amount, price, provider} = req.body;
    const product = await productService.update(id, {name, amount, price, provider});
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
})

/**
 * rota para excluir
 */
productRoute.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await productService.delete(id);
    return res.status(204).json([]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
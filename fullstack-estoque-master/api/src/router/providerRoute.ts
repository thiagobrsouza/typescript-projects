import { Router } from "express";
import { Provider } from "../entity/Provider";
import { ProviderService } from "../service/ProviderService";

export const providerRoute = Router();
const providerService = new ProviderService();

/**
 * rota para salvar
 */
providerRoute.post('/', async (req, res) => {
  const {name, cnpj} = req.body;
  const provider = new Provider(name, cnpj);
  try {
    const newProvider = await providerService.save(provider);
    res.status(201).json(newProvider);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

/**
 * rota listar todos
 */
providerRoute.get('/', async (req, res) => {
  const list = await providerService.findAll();
  res.status(200).json(list);
});

/**
 * rota para buscar um
 */
providerRoute.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const provider = await providerService.findById(id);
    res.status(200).json(provider);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

/**
 * rota para editar
 */
providerRoute.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {name, cnpj} = req.body;
    const provider = await providerService.update(id, {name, cnpj});
    res.status(200).json(provider);
  } catch (error) {
    res.status(400).json(error.message);
  }
})

/**
 * rota para excluir
 */
providerRoute.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await providerService.delete(id);
    return res.status(204).json([]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
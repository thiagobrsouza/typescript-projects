import { Router } from "express";
import { Customer } from "../entity/Customer";
import { CustomerService } from "../service/CustomerService";

export const customerRoute = Router();
const customerService = new CustomerService();

customerRoute.post('/', async (req, res) => {
  const {name, notes} = req.body;
  const newCustomer = new Customer(name, notes);
  try {
    const customer = await customerService.save(newCustomer);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

customerRoute.get('/', async (req, res) => {
  const list = await customerService.find();
  res.status(200).json(list);
});

customerRoute.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await customerService.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

customerRoute.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {name, notes} = req.body;
    const customer = await customerService.update(id, name, notes);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

customerRoute.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await customerService.remove(id);
    return res.status(204).json([]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
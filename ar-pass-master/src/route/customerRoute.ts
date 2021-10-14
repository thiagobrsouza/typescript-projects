import { Router } from "express";
import { Customer } from "../entity/Customer";
import { CustomerService } from "../service/CustomerService";

import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from "../config/middleware/isAuthenticated";

export const customerRoute = Router();
const customerService = new CustomerService();

/**
 * authenticate validation
 */
 customerRoute.use(isAuthenticated);

interface IRequest {
    name: string;
    contactName: string;
    contactEmail: string;
}

/**
 * route to save
 */
customerRoute.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().min(3).required(),
        contactName: Joi.string().min(3).required(),
        contactEmail: Joi.string().email().required()
    }
}), async (req, res) => {
    const {name, contactName, contactEmail}: IRequest = req.body;
    const customer = new Customer(name, contactName, contactEmail);
    try {
        const newCustomer = await customerService.save(customer);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to list all
 */
customerRoute.get('/', async (req, res) => {
    const list = await customerService.listAll();
    res.status(200).json(list);
});

/**
 * route to find by id
 */
customerRoute.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const customer = await customerService.findById(id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to update
 */
customerRoute.put('/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().min(3).required(),
        contactName: Joi.string().min(3).required(),
        contactEmail: Joi.string().email().required()
    },
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {name, contactName, contactEmail} = req.body;
        const customer = await customerService.update(id, {name, contactName, contactEmail});
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to delete
 */
customerRoute.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await customerService.delete(id);
        return res.status(204).json([]);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to find by name
 */
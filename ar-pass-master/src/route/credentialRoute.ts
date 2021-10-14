import { Router } from "express";
import { Credential } from "../entity/Credential";
import { CredentialService } from "../service/CredentialService";

import {celebrate, Joi, Segments} from 'celebrate';
import { Customer } from "../entity/Customer";
import { Group } from "../entity/Group";
import { title } from "process";
import isAuthenticated from "../config/middleware/isAuthenticated";

export const credentialRoute = Router();
const credentialService = new CredentialService();

/**
 * authenticate validation
 */
 credentialRoute.use(isAuthenticated);

interface IRequest {
    title: string;
    address: string;
    username: string;
    password: string;
    notes: string;
    customer: Customer;
    group: Group;
}

/**
 * route to save
 */
credentialRoute.post('/', celebrate({
    [Segments.BODY]: {
        title: Joi.string().min(5).required(),
        address: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        notes: Joi.string().allow(null).allow(''),
        customer: Joi.required(),
        group: Joi.required()
    }
}), async (req, res) => {
    const {title, address, username, password, notes, customer, group}: IRequest = req.body;
    const credential = new Credential(title, address, username, password, notes, customer, group);
    try {
        const newCredential = await credentialService.save(credential);
        res.status(201).json(newCredential);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to list all
 */
credentialRoute.get('/', async (req, res) => {
    const list = await credentialService.listAll();
    res.status(200).json(list);
});

/**
 * route to find by id
 */
credentialRoute.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const credential = await credentialService.findById(id);
        res.status(200).json(credential);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to update
 */
credentialRoute.put('/:id', celebrate({
    [Segments.BODY]: {
        title: Joi.string().min(5).required(),
        address: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        notes: Joi.string().allow(null).allow(''),
        customer: Joi.required(),
        group: Joi.required()
    },
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {title, address, username, password, notes, customer, group} = req.body;
        const credential = await credentialService.update(id, {title, address, username, password, notes, customer, group});
        res.status(200).json(credential);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to delete
 */
credentialRoute.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await credentialService.delete(id);
        return res.status(204).json([]);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to find by name
 */
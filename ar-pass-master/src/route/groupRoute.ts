import { Router } from "express";
import { Group } from "../entity/Group";
import { GroupService } from "../service/GroupService";

import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from "../config/middleware/isAuthenticated";

export const groupRoute = Router();
const groupService = new GroupService();

/**
 * authenticate validation
 */
 groupRoute.use(isAuthenticated);

interface IRequest {
    name: string;
}

/**
 * route to save
 */
groupRoute.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().min(3).required()
    }
}), async (req, res) => {
    const {name}: IRequest = req.body;
    const group = new Group(name);
    try {
        const newGroup = await groupService.save(group);
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to list all
 */
groupRoute.get('/', async (req, res) => {
    const list = await groupService.listAll();
    res.status(200).json(list);
});

/**
 * route to find by id
 */
groupRoute.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const group = await groupService.findById(id);
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to update
 */
groupRoute.put('/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().min(3).required()
    },
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {name, contactName, contactEmail} = req.body;
        const group = await groupService.update(id, {name});
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to delete
 */
groupRoute.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await groupService.delete(id);
        return res.status(204).json([]);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to find by name
 */
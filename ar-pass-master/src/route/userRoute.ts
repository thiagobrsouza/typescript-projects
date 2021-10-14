import { Router } from "express";
import { User } from "../entity/User";
import { UserService } from "../service/UserService";

import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from "../config/middleware/isAuthenticated";

export const userRoute = Router();
const userService = new UserService();

/**
 * authenticate validation
 */
 userRoute.use(isAuthenticated);

interface IRequest {
    name: string;
    email: string;
    password: string;
}

/**
 * route to save
 */
userRoute.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#$%*()?]{6,20}$/).required()
    }
}), async (req, res) => {
    const {name, email, password}: IRequest = req.body;
    const user = new User(name, email, password);
    try {
        const newUser = await userService.save(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to list
 */
userRoute.get('/', async (req, res) => {
    const list = await userService.listAll();
    res.status(200).json(list);
});

/**
 * route to find by id
 */
 userRoute.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/**
 * route to update
 */
userRoute.put('/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().min(3).uppercase().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#$%*()?]{6,20}$/).required()
    },
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {name, email, password} = req.body;
        const group = await userService.update(id, {name, email, password});
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
import { Router } from "express";
import { User } from "../entity/User";

import {celebrate, Joi, Segments} from 'celebrate';
import { CreateSessionService } from "../service/CreateSessionService";

const sessionService = new CreateSessionService();
export const sessionRoute = Router();

interface IRequest {
    email: string;
    password: string;
}

sessionRoute.post('/', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), async (req, res) => {
    try {
       const {email, password} = req.body;
       const session = await sessionService.create({email, password});
       res.status(200).json(session);
    } catch (error) {
        res.status(401).json(error.message);
    }
});
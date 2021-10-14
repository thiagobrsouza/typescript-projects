import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import OrderController from '../controllers/OrderController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.use(isAuthenticated);

orderRouter.get('/', orderController.index);

orderRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    orderController.show,
    );

    orderRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),
    orderController.create,
    );

export default orderRouter;

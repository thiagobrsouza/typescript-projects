import productRouter from '@modules/products/routes/productRoute';
import sessionsRouter from '@modules/users/routes/sessionsRoute';
import userRouter from '@modules/users/routes/userRoute';
import passwordRouter from '@modules/users/routes/passwordRoute';
import { Router } from 'express';
import profileRouter from '@modules/users/routes/profileRoute';
import customerRouter from '@modules/customers/routes/customerRoute';
import orderRouter from '@modules/order/routes/orderRoute';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', orderRouter);

export default routes;

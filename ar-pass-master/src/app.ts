import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { connectToDatabase } from './config/database';

import { customerRoute } from './route/customerRoute';
import { errors } from 'celebrate';
import { groupRoute } from './route/groupRoute';
import { credentialRoute } from './route/credentialRoute';
import { userRoute } from './route/userRoute';
import { sessionRoute } from './route/sessionRoute';
import { AppError } from './config/errors/AppError';

/**
 * create a server instance
 */
export const app = express();

/**
 * using cors to enable access to application
 */
app.use(cors());

/**
 * enable json response
 */
app.use(express.json());

/**
 * configure application logs
 */
app.use(logger('dev'));

/**
 * connect to Database
 */
connectToDatabase();

/**
 * configuration of routes
 */
app.use('/session', sessionRoute);
app.use('/customers', customerRoute);
app.use('/groups', groupRoute);
app.use('/credentials', credentialRoute);
app.use('/users', userRoute);

/**
 * validation with celebrate
 */
app.use(errors());

/**
 * customized error
 */
app.use((error, req, res, next) => {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error!'
    })
});
import "reflect-metadata";
import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { connectToDatabase } from './config/database';
import { providerRoute } from "./router/providerRoute";
import { productRoute } from "./router/productRoute";

// criando a aplicacao
const app = express();

// usando cors
app.use(cors());

// habilitando json
app.use(express.json());

// habilitando logs de desenvolvimento
app.use(logger('dev'));

// conectando no banco de dados
connectToDatabase();

/**
 * configuracao de rotas da aplicacao
 */
app.use('/providers', providerRoute);
app.use('/products', productRoute);

/**
 * iniciando e finalizando a aplicacao
 */
const port = 3000;
const server = app.listen(port, () => console.log(`Application running on port ${port}`));

process.on('SIGINT', () => {
    server.close();
    console.log('Application closed!');
});
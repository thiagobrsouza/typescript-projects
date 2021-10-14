import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { connectToDatabase } from './config/database';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(cors());

app.use(logger('dev'));

connectToDatabase();

/**
 * route configuration
 */
app.use(routes);

/**
 * server configuration
 */
const port = 3030;
const server = app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});

process.on('SIGINT', () => {
  server.close();
  console.log('Application finished!');
});
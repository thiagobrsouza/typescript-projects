import { app } from './app';
const port = 3000;
const server = app.listen(port, () => console.log(`Application running on port ${port}`));

/**
 * close the application
 */
process.on('SIGINT', () => {
    server.close();
    console.log('Application closed.');
});
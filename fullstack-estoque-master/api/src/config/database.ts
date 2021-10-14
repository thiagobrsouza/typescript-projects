import { createConnection } from "typeorm";

export const connectToDatabase = async () => {
    const connection = await createConnection();
    console.log(`Application connected to database ${connection.options.database}`);

    process.on('SIGINT', () => {
        connection.close().then(() => console.log('Database connection closed.'));
    });
};
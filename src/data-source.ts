import { join } from "path";
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities";

export const Database = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === 'development' ? process.env.DEV_DB_NAME : process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === 'development',
    logging: false,
    entities: [User],
    migrations: [join(__dirname, 'migrations/*{.ts, .js}')],
    subscribers: [],
})

export async function initializeDatabase(): Promise<DataSource> {
    try {
        const db = await Database.initialize();
        console.log(`Database (${db.options.database}) connected successfully...`);
        return db;
    } catch (error) {
        console.error('Database connection failed...');
        console.error(error);
        console.log('Aborting application...');
        process.exit(1);
    }
}
  
console.log(__dirname);
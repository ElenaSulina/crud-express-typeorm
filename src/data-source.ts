import "reflect-metadata"
import { DataSource } from "typeorm"
import * as path from 'path'
import { User } from "./User"

const databasePath = path.join(__dirname, "..", "./data/database.db")

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: databasePath,
    synchronize: true,
    entities: [User],
});

export const initDataSource = async () => {
    await AppDataSource.initialize();
    console.log("Database has been connected and initialized");
};

initDataSource().catch((error) => 
    console.log("Database connection error: ", error)
);
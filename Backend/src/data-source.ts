import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import{Book} from "./entities/Book";
import * as dotenv from "dotenv";
import { Review } from "./entities/Review";
import { Purchase } from "./entities/Purchase";
import { Cart } from "./entities/Cart";
dotenv.config();


export const AppDataSource = new DataSource({
  type: "mysql", 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: false,
  entities: [User,Book,Review,Purchase,Cart], 
  migrations: [`${process.cwd()}/src/migration/*.ts`],
  subscribers: [],
});

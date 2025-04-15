import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import{Book} from "./entities/Book";
import { Genre } from "./entities/Genre";
import * as dotenv from "dotenv";
dotenv.config();


export const AppDataSource = new DataSource({
  type: "mysql", 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, 
  logging: false,
  entities: [User,Book,Genre], 
  migrations: [`${process.cwd()}/src/migration/*.ts`],
  subscribers: [],
});

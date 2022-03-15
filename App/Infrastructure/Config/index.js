import dotenv from "dotenv";
dotenv.config();
import databaseConfig from './databaseConfig.js';
import serverConfig from './server.js'



export const database = databaseConfig;
export const server = serverConfig;
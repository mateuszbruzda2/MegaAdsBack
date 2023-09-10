import { createPool } from "mysql2/promise";
import {config} from "../config/config";

export const pool = createPool({
    // host: 'localhost',
    host: config.dbHost,
    // user: 'root',
    user: config.dbUser,
    // password: 'xxxx'
    password: config.dbPassword,
    // database: 'megak_ads',
    database: config.dbDatabase,
    namedPlaceholders: true,
    decimalNumbers: true,
});

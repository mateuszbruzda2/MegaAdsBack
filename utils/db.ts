import { createPool } from "mysql2";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    // password: 'xxxx'
    database: 'megaads',
    namedPlaceholders: true,
    decimalNumbers: true,
});

import { Options } from "sequelize";
import { Dialect } from "sequelize/types/lib/sequelize";

const db : Options = {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: process.env.DATABASE_DIALECT as Dialect
};

export default db;
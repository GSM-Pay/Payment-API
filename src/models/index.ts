import { Sequelize } from "sequelize";
import db from "./setting";

const sequelize = new Sequelize(db);

export { sequelize, Sequelize };
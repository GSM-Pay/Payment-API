import { Sequelize } from 'sequelize';
import db from './setting';

import { TransactionFactory } from './Transaction'
import { UserFactory } from './User';
import { BoothFactory } from './Booth';

const sequelize = new Sequelize(db);

const booth = BoothFactory(sequelize);
const transaction = TransactionFactory(sequelize);
const user = UserFactory(sequelize);

export { sequelize, booth, transaction, user, Sequelize };
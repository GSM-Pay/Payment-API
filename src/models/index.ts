import { Sequelize } from 'sequelize';
import db from './setting';

import { TransactionFactory } from './Transaction'
import { UserFactory } from './User';
import { BoothFactory } from './Booth';

const sequelize = new Sequelize(db);

const booth = BoothFactory(sequelize);
const transaction = TransactionFactory(sequelize);
const user = UserFactory(sequelize);

booth.hasMany(transaction, {
  as: 'Transactions',
  foreignKey: 'bid'
});

user.hasMany(transaction, {
  as: 'Transactions',
  foreignKey: 'pid'
});
user.hasOne(booth, {
  as: 'Owner',
  foreignKey: 'pid'
});

sequelize.sync();

export { sequelize, booth, transaction, user, Sequelize };
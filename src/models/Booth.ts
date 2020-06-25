import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';
import { transaction } from './index';

export interface BoothAttribute extends Model {
  readonly bid: bigint;
  readonly name: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

type BoothStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BoothAttribute;
};

export const BoothFactory = (sequelize: Sequelize) => {
  const user = <BoothStatic>sequelize.define('Booth', {
    bid: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  user.hasMany(transaction, {
    as: 'Transactions',
    foreignKey: 'bid'
  })
  return user;
};

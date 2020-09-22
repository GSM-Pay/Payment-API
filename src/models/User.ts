import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';
import { booth, transaction } from './index';

export interface UserAttribute extends Model {
  readonly pid: bigint;
  readonly id: string;
  readonly pw: string;
  readonly name: string;
  readonly grade: number;
  readonly class: number;
  readonly number: number;
  readonly amount: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserAttribute;
};

export const UserFactory = (sequelize: Sequelize) => {
  const user = <UserStatic>sequelize.define('User', {
    pid: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    pw: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    class: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  });
  return user;
};

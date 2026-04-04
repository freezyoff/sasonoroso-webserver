import { 
  Model, 
  type CreationOptional, 
  type InferAttributes, 
  type InferCreationAttributes, 
  type NonAttribute,
  DataTypes} from 'sequelize';

import sequelize from './pool.ts'
import { tableName } from '../migrations/20260326152754-create_table_user.ts';

export const UserRole = {
  super: 'super',
  salesSpv: 'sales-spv',
  sales: 'sales',
  none: '-'
}

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

// 1. Define the interface for the model's attributes
export class IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  declare id: CreationOptional<number>;
  declare usrName: string
  declare usrPwd: string
  declare usrToken: string|null
  declare usrRole: UserRoleType
  declare personIdNumber: string 
  declare personName: string 
  declare personPhone: string
}

IUser.init({
  id: {type: DataTypes.BIGINT.UNSIGNED,primaryKey: true,autoIncrement: true},
  usrName: {type: DataTypes.STRING(50),allowNull: false,},
  usrPwd: {type: DataTypes.STRING(200),allowNull: false,},
  usrToken: {type: DataTypes.STRING(200), allowNull: true, defaultValue: null},
  usrRole: {type: DataTypes.ENUM,values: ['super', 'sales-spv', 'sales', '-'],allowNull: false,defaultValue: '-'},
  personIdNumber: {type: DataTypes.STRING(30),allowNull: true,defaultValue: null},
  personName: {type: DataTypes.STRING(50),allowNull: false},
  personPhone: {type: DataTypes.STRING(30),allowNull: true,defaultValue: null},
},{
  sequelize,
  tableName: tableName,
  timestamps: true,
  paranoid: true
});
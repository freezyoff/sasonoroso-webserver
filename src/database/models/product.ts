import { 
  Model, 
  DataTypes, 
  type CreationOptional, 
  type InferAttributes, 
  type InferCreationAttributes} from 'sequelize';

import sequelize from './pool.ts';
import { tableName } from '../migrations/20260331093945-create_table_products.ts';

// 1. Define the interface for the model's attributes
export class IProduct extends Model<InferAttributes<IProduct>, InferCreationAttributes<IProduct>> {
  declare id: CreationOptional<number>;
  declare category: string
  declare name: string
  declare desc: string
  declare cogs: number
  declare suggestedRetailPrice: number
}

IProduct.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  category: {type: DataTypes.STRING(20), allowNull: false,},
  name: {type: DataTypes.STRING(50), allowNull: false},
  desc: {type: DataTypes.STRING(300), allowNull: false},
  cogs: {type: DataTypes.DECIMAL, allowNull: false},
  suggestedRetailPrice: {type: DataTypes.DECIMAL, allowNull: false}
},{
  sequelize,
  tableName: tableName,
  timestamps: true,
  paranoid: true
});
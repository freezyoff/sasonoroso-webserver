import { 
  Model, 
  DataTypes, 
  type CreationOptional, 
  type InferAttributes, 
  type InferCreationAttributes, 
  Sequelize} from 'sequelize';

import sequelize from './pool.ts'
import { tableName } from '../migrations/20260331092041-create_table_partners.ts';

export class IPartner extends Model<InferAttributes<IPartner>, InferCreationAttributes<IPartner>> {

  declare id: CreationOptional<number>;
  declare salesPersonId: number|null
  declare storeName: string
  declare storeAddr: string
  declare storeMapHttp: string|null
  declare storeMapLatitude: string|null
  declare storeMapLongitude: string|null
  declare ownerName: string|null
  declare ownerPhone: string|null
  declare picName: string
  declare picPhone: string
}

IPartner.init({
  id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true,},
  salesPersonId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: true, defaultValue: null},
  storeName: {type: DataTypes.STRING(50), allowNull: false,},
  storeAddr: {type: DataTypes.STRING(200), allowNull: false,},
  storeMapHttp: {type: DataTypes.TEXT, allowNull: true, defaultValue: null},
  storeMapLatitude: {type: DataTypes.STRING(20), allowNull: true, defaultValue: null},
  storeMapLongitude: {type: DataTypes.STRING(20), allowNull: true, defaultValue: null},
  ownerName: {type: DataTypes.STRING(50), allowNull: true, defaultValue: null},
  ownerPhone: {type: DataTypes.STRING(30), allowNull: true, defaultValue: null},
  picName: {type: DataTypes.STRING(50), allowNull: false},
  picPhone: {type: DataTypes.STRING(30), allowNull: false},
},{
  sequelize,
  tableName: tableName,
  timestamps: true,
  paranoid: true
});
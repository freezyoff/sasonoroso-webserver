import { 
  Model, 
  DataTypes, 
  type CreationOptional, 
  type InferAttributes, 
  type InferCreationAttributes, 
  type NonAttribute} from 'sequelize';

import sequelize from './pool.ts'
import { 
  tableNameConsignment, 
  tableNameConsignmentDetails, 
  tableNameConsignmentPayments,
  tableNameConsignmentSold } from '../migrations/20260331101858-create_table_orders.ts';
import { IUser } from './user.ts';
import { IPartner } from './partner.ts';

export class IConsigment extends Model<InferAttributes<IConsigment>, InferCreationAttributes<IConsigment>> {

  declare id: CreationOptional<number>
  declare date: Date
  declare partnerId: bigint
  declare shipmentDate: Date|null

  declare salesPerson: NonAttribute<IUser>

  declare partner: NonAttribute<IPartner>
  declare products: NonAttribute<IConsignmentDetail[]>
  declare solds: NonAttribute<IConsignmentSold[]>
  declare payments: NonAttribute<IConsignmentPayed[]>;

  ammount(): number{
    const details = this.products;
    let amm:number = 0;
    for (var i=0; i<details.length; i++){
      amm += details.at(i)!.price * details.at(i)!.qty;
    }
    return amm;
  }
}

export class IConsignmentDetail extends Model<InferAttributes<IConsignmentDetail>, InferCreationAttributes<IConsignmentDetail>> {

  declare id: CreationOptional<number>
  declare orderId: bigint
  declare productId: bigint
  declare qty: number
  declare price: number

  declare consign: NonAttribute<IConsigment>;

}

export class IConsignmentSold extends Model<InferAttributes<IConsignmentSold>, InferCreationAttributes<IConsignmentSold>> {

  declare id: CreationOptional<number>
  declare orderId: number
  declare productId: bigint
  declare soldQty: number
  declare soldPrice: number
  declare returnQty: number

  declare consign: NonAttribute<IConsigment>;

}

export const PaymentMethod = {
  cash: 0,
  accountTransfer: 1
}

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export class IConsignmentPayed extends Model<InferAttributes<IConsignmentPayed>, InferCreationAttributes<IConsignmentPayed>> {

  declare id: CreationOptional<number>
  declare orderId: bigint
  declare method: PaymentMethodType
  declare acc: string|null
  declare ammount: number

  declare consign: NonAttribute<IConsigment>;
}

IConsigment.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  date: {type: DataTypes.DATE, allowNull: false},
  partnerId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  shipmentDate: {type: DataTypes.DATE, allowNull: true, defaultValue: null},
},{
  sequelize,
  tableName: tableNameConsignment,
  timestamps: true,
  paranoid: true
});    

IConsignmentDetail.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  orderId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  productId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  qty: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
  price: {type: DataTypes.DOUBLE.UNSIGNED, allowNull: false},
},{
  sequelize,
  tableName: tableNameConsignmentDetails,
  timestamps: true,
  paranoid: true
});

IConsignmentSold.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  orderId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  productId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  soldQty: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
  soldPrice: {type: DataTypes.DOUBLE.UNSIGNED, allowNull: false},
  returnQty: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
},{
  sequelize,
  tableName: tableNameConsignmentSold,
  timestamps: true,
  paranoid: true
});

IConsignmentPayed.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  orderId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  method: {type: DataTypes.TINYINT, allowNull: false},
  acc: {type: DataTypes.STRING(20), allowNull: true, defaultValue: null},
  ammount: {type: DataTypes.DOUBLE, allowNull: false},
},{
  sequelize,
  tableName: tableNameConsignmentPayments,
  timestamps: true,
  paranoid: true
})
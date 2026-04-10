import { 
  Model, 
  DataTypes, 
  type CreationOptional, 
  type InferAttributes, 
  type InferCreationAttributes, 
  type NonAttribute} from 'sequelize';

import sequelize from './pool.ts'
import { 
  tableNameOrders, 
  tableNameOrderDetails, 
  tableNameOrderRealizations,
  tableNameOrderPayments } from '../migrations/20260331101858-create_table_orders.ts';
import { IUser } from './user.ts';
import { IPartner } from './partner.ts';

export class IOrder extends Model<InferAttributes<IOrder>, InferCreationAttributes<IOrder>> {

  declare id: CreationOptional<number>
  declare date: Date
  declare partnerId: bigint
  declare shipmentDate: Date|null

  declare salesPerson: NonAttribute<IUser>

  declare partner: NonAttribute<IPartner>
  declare products: NonAttribute<IOrderDetail[]>
  declare solds: NonAttribute<IOrderRealization[]>
  declare payments: NonAttribute<IOrderPayment[]>;

  ammount(): number{
    const details = this.products;
    let amm:number = 0;
    for (var i=0; i<details.length; i++){
      amm += details.at(i)!.price * details.at(i)!.qty;
    }
    return amm;
  }
}

export class IOrderDetail extends Model<InferAttributes<IOrderDetail>, InferCreationAttributes<IOrderDetail>> {

  declare id: CreationOptional<number>
  declare orderId: bigint
  declare productId: bigint
  declare qty: number
  declare price: number

  declare order: NonAttribute<IOrder>;

}

export class IOrderRealization extends Model<InferAttributes<IOrderRealization>, InferCreationAttributes<IOrderRealization>> {

  declare id: CreationOptional<number>
  declare orderId: number
  declare productId: bigint
  declare soldQty: number
  declare soldPrice: number
  declare returnQty: number

  declare order: NonAttribute<IOrder>;

}

export const PaymentMethod = {
  cash: 0,
  accountTransfer: 1
}

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export class IOrderPayment extends Model<InferAttributes<IOrderPayment>, InferCreationAttributes<IOrderPayment>> {

  declare id: CreationOptional<number>
  declare orderId: bigint
  declare method: PaymentMethodType
  declare acc: string|null
  declare ammount: number

  declare order: NonAttribute<IOrder>;
}

IOrder.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  date: {type: DataTypes.DATE, allowNull: false},
  partnerId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  shipmentDate: {type: DataTypes.DATE, allowNull: true, defaultValue: null},
},{
  sequelize,
  tableName: tableNameOrders,
  timestamps: true,
  paranoid: true
});    

IOrderDetail.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  orderId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  productId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  qty: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
  price: {type: DataTypes.DOUBLE.UNSIGNED, allowNull: false},
},{
  sequelize,
  tableName: tableNameOrderDetails,
  timestamps: true,
  paranoid: true
});

IOrderRealization.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  orderId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  productId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  soldQty: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
  soldPrice: {type: DataTypes.DOUBLE.UNSIGNED, allowNull: false},
  returnQty: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
},{
  sequelize,
  tableName: tableNameOrderRealizations,
  timestamps: true,
  paranoid: true
});

IOrderPayment.init({
  id: {type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true},
  orderId: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
  method: {type: DataTypes.TINYINT, allowNull: false},
  acc: {type: DataTypes.STRING(20), allowNull: true, defaultValue: null},
  ammount: {type: DataTypes.DOUBLE, allowNull: false},
},{
  sequelize,
  tableName: tableNameOrderPayments,
  timestamps: true,
  paranoid: true
})
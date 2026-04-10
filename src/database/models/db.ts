import sequelize from './pool.ts'
import { IUser } from "./user.ts";
import { IPartner } from "./partner.ts";
import { IOrder, IOrderDetail, IOrderPayment, IOrderRealization } from './order.ts';
import { IProduct } from './product.ts';

IOrder.belongsTo(IPartner, {foreignKey: 'id', as: 'partner'});
IOrder.hasMany(IOrderDetail, {foreignKey: 'orderId', as: 'products' });
IOrder.hasMany(IOrderRealization, {foreignKey: 'orderId', as: 'solds' });
IOrder.hasMany(IOrderPayment, {foreignKey: 'orderId', as: 'payments' });

IOrderDetail.belongsTo(IOrder, {foreignKey: 'id', as: 'order' });
IOrderRealization.belongsTo(IOrder, {foreignKey: 'id', as: 'order' });
IOrderPayment.belongsTo(IOrder, {foreignKey: 'id', as: 'order'});

export { sequelize, IUser, IProduct, IPartner, IOrder, IOrderDetail, IOrderPayment, IOrderRealization }
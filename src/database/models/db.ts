import sequelize from './pool.ts'
import { IUser } from "./user.ts";
import { IPartner } from "./partner.ts";
import { IConsigment, IConsignmentDetail, IConsignmentPayed, IConsignmentSold } from './order.ts';
import { IProduct } from './product.ts';

IConsigment.belongsTo(IPartner, {foreignKey: 'id', as: 'partner'});
IConsigment.hasMany(IConsignmentDetail, {foreignKey: 'orderId', as: 'products' });
IConsigment.hasMany(IConsignmentSold, {foreignKey: 'orderId', as: 'solds' });
IConsigment.hasMany(IConsignmentPayed, {foreignKey: 'orderId', as: 'payments' });

IConsignmentDetail.belongsTo(IConsigment, {foreignKey: 'id', as: 'consign' });
IConsignmentSold.belongsTo(IConsigment, {foreignKey: 'id', as: 'consign' });
IConsignmentPayed.belongsTo(IConsigment, {foreignKey: 'id', as: 'consign'});

export { sequelize, IUser, IProduct, IPartner, IConsigment, IConsignmentDetail, IConsignmentPayed, IConsignmentSold }
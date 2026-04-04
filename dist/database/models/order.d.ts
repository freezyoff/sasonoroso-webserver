import { Model, type CreationOptional, type InferAttributes, type InferCreationAttributes, type NonAttribute } from 'sequelize';
import { IUser } from './user.ts';
import { IPartner } from './partner.ts';
export declare class IConsigment extends Model<InferAttributes<IConsigment>, InferCreationAttributes<IConsigment>> {
    id: CreationOptional<number>;
    date: Date;
    partnerId: bigint;
    shipmentDate: Date | null;
    salesPerson: NonAttribute<IUser>;
    partner: NonAttribute<IPartner>;
    products: NonAttribute<IConsignmentDetail[]>;
    solds: NonAttribute<IConsignmentSold[]>;
    payments: NonAttribute<IConsignmentPayed[]>;
    ammount(): number;
}
export declare class IConsignmentDetail extends Model<InferAttributes<IConsignmentDetail>, InferCreationAttributes<IConsignmentDetail>> {
    id: CreationOptional<number>;
    orderId: bigint;
    productId: bigint;
    qty: number;
    price: number;
    consign: NonAttribute<IConsigment>;
}
export declare class IConsignmentSold extends Model<InferAttributes<IConsignmentSold>, InferCreationAttributes<IConsignmentSold>> {
    id: CreationOptional<number>;
    orderId: number;
    productId: bigint;
    soldQty: number;
    soldPrice: number;
    returnQty: number;
    consign: NonAttribute<IConsigment>;
}
export declare const PaymentMethod: {
    cash: number;
    accountTransfer: number;
};
export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];
export declare class IConsignmentPayed extends Model<InferAttributes<IConsignmentPayed>, InferCreationAttributes<IConsignmentPayed>> {
    id: CreationOptional<number>;
    orderId: bigint;
    method: PaymentMethodType;
    acc: string | null;
    ammount: number;
    consign: NonAttribute<IConsigment>;
}
//# sourceMappingURL=order.d.ts.map
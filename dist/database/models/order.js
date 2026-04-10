import { Model, DataTypes } from 'sequelize';
import sequelize from "./pool.js";
import { tableNameConsignment, tableNameConsignmentDetails, tableNameConsignmentPayments, tableNameConsignmentSold } from "../migrations/20260331101858-create_table_orders.js";
export class IConsigment extends Model {
    ammount() {
        const details = this.products;
        let amm = 0;
        for (var i = 0; i < details.length; i++) {
            amm += details.at(i).price * details.at(i).qty;
        }
        return amm;
    }
}
export class IConsignmentDetail extends Model {
}
export class IConsignmentSold extends Model {
}
export const PaymentMethod = {
    cash: 0,
    accountTransfer: 1
};
export class IConsignmentPayed extends Model {
}
IConsigment.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, allowNull: false },
    partnerId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    shipmentDate: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
}, {
    sequelize,
    tableName: tableNameConsignment,
    timestamps: true,
    paranoid: true
});
IConsignmentDetail.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    productId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    qty: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    price: { type: DataTypes.DOUBLE.UNSIGNED, allowNull: false },
}, {
    sequelize,
    tableName: tableNameConsignmentDetails,
    timestamps: true,
    paranoid: true
});
IConsignmentSold.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    productId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    soldQty: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    soldPrice: { type: DataTypes.DOUBLE.UNSIGNED, allowNull: false },
    returnQty: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, {
    sequelize,
    tableName: tableNameConsignmentSold,
    timestamps: true,
    paranoid: true
});
IConsignmentPayed.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    method: { type: DataTypes.TINYINT, allowNull: false },
    acc: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
    ammount: { type: DataTypes.DOUBLE, allowNull: false },
}, {
    sequelize,
    tableName: tableNameConsignmentPayments,
    timestamps: true,
    paranoid: true
});

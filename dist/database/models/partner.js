import { Model, DataTypes } from 'sequelize';
import sequelize from "./pool.js";
import { tableName } from "../migrations/20260331092041-create_table_partners.js";
export class IPartner extends Model {
}
IPartner.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true, },
    salesPersonId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, defaultValue: null },
    storeName: { type: DataTypes.STRING(50), allowNull: false, },
    storeAddr: { type: DataTypes.STRING(200), allowNull: false, },
    storeMapHttp: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    storeMapLatitude: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
    storeMapLongitude: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
    ownerName: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null },
    ownerPhone: { type: DataTypes.STRING(30), allowNull: true, defaultValue: null },
    picName: { type: DataTypes.STRING(50), allowNull: false },
    picPhone: { type: DataTypes.STRING(30), allowNull: false },
}, {
    sequelize,
    tableName: tableName,
    timestamps: true,
    paranoid: true
});

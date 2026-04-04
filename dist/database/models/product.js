import { Model, DataTypes } from 'sequelize';
import sequelize from "./pool.js";
import { tableName } from "../migrations/20260331093945-create_table_products.js";
// 1. Define the interface for the model's attributes
export class IProduct extends Model {
}
IProduct.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING(20), allowNull: false, },
    name: { type: DataTypes.STRING(50), allowNull: false },
    desc: { type: DataTypes.STRING(300), allowNull: false },
    cogs: { type: DataTypes.DECIMAL, allowNull: false },
    suggestedRetailPrice: { type: DataTypes.DECIMAL, allowNull: false }
}, {
    sequelize,
    tableName: tableName,
    timestamps: true,
    paranoid: true
});
//# sourceMappingURL=product.js.map
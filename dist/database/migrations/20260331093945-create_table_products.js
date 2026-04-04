'use strict';
import { Sequelize, BIGINT, DECIMAL, STRING, DATE } from "sequelize";
export const tableName = "products";
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface) {
        await queryInterface.createTable(tableName, {
            id: { type: BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true, },
            category: { type: STRING(20), allowNull: false, },
            name: { type: STRING(50), allowNull: false },
            desc: { type: STRING(300), allowNull: false },
            cogs: { type: DECIMAL, allowNull: false },
            suggestedRetailPrice: { type: DECIMAL, allowNull: false },
            createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            deletedAt: { type: DATE, allowNull: true, defaultValue: null }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable(tableName);
    }
};
//# sourceMappingURL=20260331093945-create_table_products.js.map
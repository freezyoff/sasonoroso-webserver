'use strict';
import { Sequelize, BIGINT, DATE, INTEGER, DOUBLE, TINYINT, STRING, DECIMAL } from "sequelize";
export const tableNameOrders = 'orders';
export const tableNameOrderDetails = 'orders_details';
export const tableNameOrderRealizations = 'orders_realization';
export const tableNameOrderPayments = 'orders_payments';
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface) {
        await queryInterface.createTable(tableNameOrders, {
            id: { type: BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true, },
            date: { type: DATE, allowNull: false },
            partnerId: { type: BIGINT.UNSIGNED, allowNull: false },
            shipmentDate: { type: DATE, allowNull: true, defaultValue: null },
            createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            deletedAt: { type: DATE, allowNull: true, defaultValue: null }
        });
        await queryInterface.createTable(tableNameOrderDetails, {
            id: { type: BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true, },
            orderId: { type: BIGINT.UNSIGNED, allowNull: false },
            productId: { type: BIGINT.UNSIGNED, allowNull: false },
            qty: { type: INTEGER.UNSIGNED, allowNull: false },
            price: { type: DOUBLE.UNSIGNED, allowNull: false },
            createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            deletedAt: { type: DATE, allowNull: true, defaultValue: null }
        });
        await queryInterface.createTable(tableNameOrderRealizations, {
            id: { type: BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true, },
            orderId: { type: BIGINT.UNSIGNED, allowNull: false },
            productId: { type: BIGINT.UNSIGNED, allowNull: false },
            soldQty: { type: INTEGER.UNSIGNED, allowNull: false },
            soldPrice: { type: DOUBLE.UNSIGNED, allowNull: false },
            returnQty: { type: INTEGER.UNSIGNED, allowNull: false },
            createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            deletedAt: { type: DATE, allowNull: true, defaultValue: null }
        });
        await queryInterface.createTable(tableNameOrderPayments, {
            id: { type: BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true, },
            orderId: { type: BIGINT.UNSIGNED, allowNull: false },
            method: { type: TINYINT, allowNull: false },
            acc: { type: STRING(20), allowNull: true, defaultValue: null },
            ammount: { type: DECIMAL, allowNull: false },
            createdAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            deletedAt: { type: DATE, allowNull: true, defaultValue: null }
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable(tableNameOrderPayments);
        await queryInterface.dropTable(tableNameOrderRealizations);
        await queryInterface.dropTable(tableNameOrderDetails);
        await queryInterface.dropTable(tableNameOrders);
    }
};

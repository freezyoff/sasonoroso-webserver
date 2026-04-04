'use strict';

import { Sequelize, BIGINT, DECIMAL, STRING, type QueryInterface, DATE } from "sequelize";

export const tableName = "products";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface:QueryInterface) {
    await queryInterface.createTable(tableName, { 
      id: { type: BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true,},
      category: {type: STRING(20), allowNull: false,},
      name: {type: STRING(50), allowNull: false},
      desc: {type: STRING(300), allowNull: false},
      cogs: {type: DECIMAL, allowNull: false},
      suggestedRetailPrice: {type: DECIMAL, allowNull: false},
      createdAt: {type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      deletedAt: {type: DATE, allowNull: true, defaultValue: null}
    });
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.dropTable(tableName);
  }
};

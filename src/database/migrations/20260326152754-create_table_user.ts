'use strict';

import { 
  QueryInterface, 
  Sequelize, 
  BIGINT, 
  STRING, 
  ENUM, 
  DATE } from "sequelize";

export const tableName = "users";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface:QueryInterface) {
    queryInterface.createTable(tableName, { 
      id: {type: BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true,},
      usrName: {type: STRING(50), allowNull: false,},
      usrPwd: {type: STRING(200), allowNull: false,},
      usrToken: {type: STRING(200), allowNull: true, defaultValue: null},
      usrRole: {type: ENUM, values: ['super', 'sales-spv', 'sales', '-'], allowNull: false, defaultValue: '-'},
      personIdNumber: {type: STRING(30), allowNull: true, defaultValue: null},
      personName: {type: STRING(50), allowNull: false},
      personPhone: {type: STRING(30), allowNull: true, defaultValue: null},
      createdAt: {allowNull: false, type: DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {allowNull: false, type: DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      deletedAt: {type: DATE, allowNull: true, defaultValue: null},
    });
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.dropTable(tableName);
  }
};

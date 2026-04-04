'use strict';

import { Sequelize, BIGINT, DATE, STRING, TEXT, type QueryInterface } from "sequelize";

export const tableName = 'partners';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface:QueryInterface) {
    await queryInterface.createTable(tableName, { 
      id: { type: BIGINT.UNSIGNED, allowNull: false, autoIncrement: true, primaryKey: true,},
      salesPersonId: {type: BIGINT.UNSIGNED, allowNull: true, defaultValue: null},
      storeName: {type: STRING(50), allowNull: false,},
      storeAddr: {type: STRING(200), allowNull: false,},
      storeMapHttp: {type: TEXT, allowNull: true, defaultValue: null},
      storeMapLatitude: {type: STRING(20), allowNull: true, defaultValue: null},
      storeMapLongitude: {type: STRING(20), allowNull: true, defaultValue: null},
      ownerName: {type: STRING(50), allowNull: true, defaultValue: null},
      ownerPhone: {type: STRING(30), allowNull: true, defaultValue: null},
      picName: {type: STRING(50), allowNull: false},
      picPhone: {type: STRING(30), allowNull: false},
      createdAt: {type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {type: DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      deletedAt: {type: DATE, allowNull: true, defaultValue: null}
    });
  },

  async down (queryInterface:QueryInterface) {
    await queryInterface.dropTable(tableName);
  }
};

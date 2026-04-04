'use strict';

import type { QueryInterface, Sequelize } from "sequelize";
import crypto from 'crypto'
import { UserRole } from "../models/user.ts";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface:QueryInterface, Sequelize:Sequelize) {
    await queryInterface.bulkInsert('users', [
      { 
        usrName: 'root',
        usrPwd: crypto.createHash('sha512').update('Yousummonme3105').digest('hex'),
        usrToken: crypto.createHash('sha512').update('Yousummonme3105').digest('hex'),
        usrRole: UserRole.super,
        personIdNumber: '3578033105840001',
        personName: 'musa hadi',
        personPhone: '+62 8113209855'
      }
    ], {});
  },

  async down (queryInterface:QueryInterface, Sequelize:Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

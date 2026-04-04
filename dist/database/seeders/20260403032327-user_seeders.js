'use strict';
import crypto from 'crypto';
import { UserRole } from "../models/user.js";
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
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
    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
//# sourceMappingURL=20260403032327-user_seeders.js.map
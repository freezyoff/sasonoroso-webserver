import { expect } from 'chai';
import { describe } from 'mocha';
import crypto from 'crypto';
import MIG from "./../../../database/migrations/20260326152754-create_table_user.js";
import { sequelize, IUser } from "./../../../database/models/db.js";
import { faker } from '@faker-js/faker';
import { UserRole } from "../../../database/models/user.js";
describe('> database/models/user.ts', () => {
    it('create table `users`', async function () {
        this.timeout(5000);
        await MIG.up(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
    });
    it('create new IUser', async () => {
        const data = {
            usrName: faker.internet.username(),
            usrPwd: crypto.createHash('sha256').update(faker.internet.password()).digest('hex'),
            usrToken: crypto.createHash('sha256').update(faker.number.int({ min: 1000, max: 9999 }).toString()).digest('hex'),
            usrRole: faker.helpers.enumValue(UserRole),
            personIdNumber: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
            personName: faker.person.fullName(),
            personPhone: faker.phone.number()
        };
        const newUser = await IUser.create(data);
        const instance = await IUser.findByPk(newUser.id, { rejectOnEmpty: true });
        expect(instance.id).equal(newUser.id);
        expect(instance.usrName).equal(data.usrName);
    });
    it('drop table `users`', async function () {
        this.timeout(5000);
        await MIG.down(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
    });
});

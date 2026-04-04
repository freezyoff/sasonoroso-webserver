import { expect } from 'chai';
import supertest from 'supertest';
import { describe } from 'mocha';
import crypto from 'crypto';
import { sequelize, IPartner } from "../../../database/models/db.js";
import MIG from "../../../database/migrations/20260331092041-create_table_partners.js";
import { faker } from '@faker-js/faker';
describe('> database/models/partner.ts', () => {
    it('create table `partners`', async function () {
        this.timeout(5000);
        await MIG.up(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
    });
    it('create new IPartner', async () => {
        const data = [
            {
                storeName: faker.person.fullName(),
                storeAddr: faker.location.streetAddress(),
                storeMapHttp: null,
                storeMapLatitude: faker.location.latitude().toString(),
                storeMapLongitude: faker.location.longitude().toString(),
                ownerName: null,
                ownerPhone: null,
                picName: faker.person.fullName(),
                picPhone: faker.phone.number(),
            },
            {
                storeName: faker.person.fullName(),
                storeAddr: faker.location.streetAddress(),
                storeMapHttp: null,
                storeMapLatitude: faker.location.latitude().toString(),
                storeMapLongitude: faker.location.longitude().toString(),
                ownerName: faker.person.fullName(),
                ownerPhone: faker.phone.number(),
                picName: faker.person.fullName(),
                picPhone: faker.phone.number(),
            },
        ];
        for (const dd of data) {
            const iNew = await IPartner.create(dd);
            const instance = await IPartner.findByPk(iNew.id, { rejectOnEmpty: true });
            expect(instance.id).equal(iNew.id);
        }
    });
    it('drop table `users`', async function () {
        this.timeout(5000);
        await MIG.down(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
    });
});
//# sourceMappingURL=partners.spec.js.map
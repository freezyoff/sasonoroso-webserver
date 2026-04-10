import * as chai from 'chai';
import request from 'supertest';
import { describe } from 'mocha';
import { app } from "../../index.js";
import sequelize from "../../database/models/pool.js";
const expect = chai.expect;
import MIG_PARTNER from "../../database/migrations/20260331092041-create_table_partners.js";
import { faker } from '@faker-js/faker';
import { IPartner } from "../../database/models/partner.js";
describe('> http: user.js', () => {
    before(async () => {
        await MIG_PARTNER.down(sequelize.getQueryInterface());
        await MIG_PARTNER.up(sequelize.getQueryInterface());
    });
    after(async () => {
        await MIG_PARTNER.down(sequelize.getQueryInterface());
    });
    it('save: empty JSON', async () => {
        await request(app).post(`/api/partner/save`)
            .send({})
            .set('Accept', 'application/json')
            .expect(422);
    });
    it('save: incomplete JSON params', async () => {
        await request(app).post(`/api/partner/save`)
            .send({
            storeName: faker.company.name(),
            storeAddr: faker.location.streetAddress()
        })
            .set('Accept', 'application/json')
            .expect(422);
    });
    it('save: insert', async () => {
        await request(app).post(`/api/partner/save`)
            .send({
            storeName: faker.company.name(),
            storeAddr: faker.location.streetAddress(),
            picName: faker.person.fullName(),
            picPhone: faker.phone.number(),
        })
            .set('Accept', 'application/json')
            .expect(201);
    });
    it('save: update', async () => {
        const record = await IPartner.findByPk(1);
        if (record) {
            const json = record.toJSON();
            json.ownerName = faker.person.fullName();
            json.ownerName = faker.phone.number();
            await request(app).post('/api/partner/save')
                .send(json)
                .set('Accept', 'application/json')
                .expect(200);
        }
        // log("save: update ", response.body);
    });
    it('delete: unknown record', async () => {
        await request(app).post('/api/partner/remove')
            .send({ id: 10 })
            .set('Accept', 'application/json')
            .expect(422);
        // log("save: update ", response.body);
    });
    it('delete: known record', async () => {
        await request(app).post('/api/partner/remove')
            .send({ id: 1 })
            .set('Accept', 'application/json')
            .expect(200);
        // log("save: update ", response.body);
    });
    it('fetch: all', async () => {
        const loop = 10;
        for (var i = 0; i < loop; i++) {
            await request(app).post('/api/partner/save')
                .set('Accept', 'application/json')
                .send({
                storeName: faker.company.name(),
                storeAddr: faker.location.streetAddress(),
                picName: faker.person.fullName(),
                picPhone: faker.phone.number(),
            })
                .expect(201);
        }
        const response = await request(app).post('/api/partner/fetch')
            .send({})
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.length).equal(loop);
        // log("fetch: all ", response.body);
    });
    it('fetch: limit', async () => {
        const response = await request(app).post('/api/partner/fetch')
            .send({
            limit: 2,
            offset: 0,
        })
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.length).equal(2);
        // log("fetch: all ", response.body);
    });
    it('fetch: limit offset', async () => {
        const response = await request(app).post('/api/partner/fetch')
            .send({
            limit: 2,
            offset: 2,
        })
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.length).equal(2);
        expect(response.body.at(0).id).equal(4);
        expect(response.body.at(1).id).equal(5);
        // log("fetch: all ", response.body);
    });
    it('fetch: limit offset order', async () => {
        const response = await request(app).post('/api/partner/fetch')
            .send({
            limit: 2,
            offset: 0,
            order: [['id', 'DESC']]
        })
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.length).equal(2);
        expect(response.body.at(0).id).equal(11);
        expect(response.body.at(1).id).equal(10);
        // log("fetch: limit offset order", response.body);
    });
});

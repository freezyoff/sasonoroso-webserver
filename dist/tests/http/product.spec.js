import * as chai from 'chai';
import request from 'supertest';
import { describe } from 'mocha';
import { server, app } from "../../index.js";
import sequelize from "../../database/models/pool.js";
const expect = chai.expect;
import MIG_PRODUCT from "../../database/migrations/20260331093945-create_table_products.js";
import { faker } from '@faker-js/faker';
import { log } from 'node:console';
import { IProduct } from "../../database/models/db.js";
const categories = ['Electronics', 'Books', 'Clothing', 'Home & Garden', 'Sports'];
describe('> http: user.js', () => {
    before(async () => {
        await MIG_PRODUCT.down(sequelize.getQueryInterface());
        await MIG_PRODUCT.up(sequelize.getQueryInterface());
    });
    after(async () => {
        await MIG_PRODUCT.down(sequelize.getQueryInterface());
        server.close();
    });
    it('save: empty JSON', async () => {
        await request(app).post(`/api/product/save`)
            .send({})
            .set('Accept', 'application/json')
            .expect(422);
    });
    it('save: incomplete JSON params', async () => {
        await request(app).post(`/api/product/save`)
            .send({
            // category: faker.helpers.arrayElement(categories),
            name: faker.commerce.productName(),
            desc: faker.commerce.productDescription(),
            cogs: faker.commerce.price(),
            suggestedRetailPrice: faker.commerce.price()
        })
            .set('Accept', 'application/json')
            .expect(422);
    });
    it('save: insert', async () => {
        await request(app).post(`/api/product/save`)
            .send({
            category: faker.helpers.arrayElement(categories),
            name: faker.commerce.productName(),
            desc: faker.commerce.productDescription(),
            cogs: faker.commerce.price(),
            suggestedRetailPrice: faker.commerce.price()
        })
            .set('Accept', 'application/json')
            .expect(201);
    });
    it('save: update', async () => {
        const record = await IProduct.findByPk(1);
        if (record) {
            const json = record.toJSON();
            json.category = faker.helpers.arrayElement(categories);
            await request(app).post('/api/product/save')
                .send(json)
                .set('Accept', 'application/json')
                .expect(200);
        }
        // log("save: update ", response.body);
    });
    it('delete: unknown record', async () => {
        await request(app).post('/api/product/remove')
            .send({ id: 10 })
            .set('Accept', 'application/json')
            .expect(422);
        // log("save: update ", response.body);
    });
    it('delete: known record', async () => {
        await request(app).post('/api/product/remove')
            .send({ id: 1 })
            .set('Accept', 'application/json')
            .expect(200);
        // log("save: update ", response.body);
    });
    it('fetch: all', async () => {
        const loop = 10;
        for (var i = 0; i < loop; i++) {
            await request(app).post('/api/product/save')
                .set('Accept', 'application/json')
                .send({
                category: faker.helpers.arrayElement(categories),
                name: faker.commerce.productName(),
                desc: faker.commerce.productDescription(),
                cogs: faker.commerce.price(),
                suggestedRetailPrice: faker.commerce.price()
            })
                .expect(201);
        }
        const response = await request(app).post('/api/product/fetch')
            .send({})
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.length).equal(loop);
        // log("fetch: all ", response.body);
    });
    it('fetch: limit', async () => {
        const response = await request(app).post('/api/product/fetch')
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
        const response = await request(app).post('/api/product/fetch')
            .send({
            limit: 2,
            offset: 2,
        })
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.length).equal(2);
        // log("fetch: all ", response.body);
    });
    it('fetch: limit offset order', async () => {
        const response = await request(app).post('/api/product/fetch')
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
//# sourceMappingURL=product.spec.js.map
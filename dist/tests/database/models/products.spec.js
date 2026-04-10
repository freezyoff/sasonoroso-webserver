import { expect } from 'chai';
import { describe } from 'mocha';
import { sequelize, IProduct } from "../../../database/models/db.js";
import MIG from "../../../database/migrations/20260331093945-create_table_products.js";
import { faker } from '@faker-js/faker';
const categoryEnum = ['hello', 'yooo', 'zzzzzz'];
describe('> database/models/product.ts', () => {
    it('create table `product`', async function () {
        this.timeout(5000);
        await MIG.up(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
    });
    it('create new IProduct', async () => {
        const data = [
            {
                category: faker.helpers.arrayElement(categoryEnum),
                name: faker.commerce.productName(),
                desc: faker.commerce.productDescription(),
                cogs: Number(faker.commerce.price()),
                suggestedRetailPrice: Number.parseInt(faker.commerce.price())
            },
            {
                category: faker.helpers.arrayElement(categoryEnum),
                name: faker.commerce.productName(),
                desc: faker.commerce.productDescription(),
                cogs: Number(faker.commerce.price()),
                suggestedRetailPrice: Number.parseInt(faker.commerce.price())
            },
        ];
        for (const dd of data) {
            const iNew = await IProduct.create(dd);
            const instance = await IProduct.findByPk(iNew.id, { rejectOnEmpty: true });
            expect(instance.id).equal(iNew.id);
        }
    });
    it('drop table `product`', async function () {
        this.timeout(5000);
        await MIG.down(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
    });
});

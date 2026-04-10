import { expect } from 'chai';
import { describe } from 'mocha';
import crypto from 'crypto';
import { faker } from '@faker-js/faker';
import MIG_USER from "../../../database/migrations/20260326152754-create_table_user.js";
import MIG_PARTNER from "../../../database/migrations/20260331092041-create_table_partners.js";
import MIG_PRODUCT from "../../../database/migrations/20260331093945-create_table_products.js";
import MIG_ORDER from "../../../database/migrations/20260331101858-create_table_orders.js";
import { sequelize, IUser, IPartner, IProduct, IConsigment, IConsignmentDetail, IConsignmentPayed } from "../../../database/models/db.js";
import { UserRole } from "../../../database/models/user.js";
import { PaymentMethod } from "../../../database/models/order.js";
const fakeProductCategories = ['hello', 'yooo', 'zzzzzz'];
var fakeUser;
var fakePartner;
var fakeProducts;
var fakeOrder;
let fakeAmmount = 0;
describe('> database/models/order.ts', () => {
    before(async function () {
        this.timeout(5000);
        // fake user
        await MIG_USER.up(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
        fakeUser = await IUser.create({
            usrName: faker.internet.username(),
            usrPwd: crypto.createHash('sha256').update(faker.internet.password()).digest('hex'),
            usrToken: crypto.createHash('sha256').update(faker.number.int({ min: 1000, max: 9999 }).toString()).digest('hex'),
            usrRole: faker.helpers.enumValue(UserRole),
            personIdNumber: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
            personName: faker.person.fullName(),
            personPhone: faker.phone.number()
        });
        // fake partner
        await MIG_PARTNER.up(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
        fakePartner = await IPartner.create({
            storeName: faker.person.fullName(),
            storeAddr: faker.location.streetAddress(),
            storeMapHttp: null,
            storeMapLatitude: faker.location.latitude().toString(),
            storeMapLongitude: faker.location.longitude().toString(),
            ownerName: null,
            ownerPhone: null,
            picName: faker.person.fullName(),
            picPhone: faker.phone.number(),
        });
        // fake product
        await MIG_PRODUCT.up(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
        fakeProducts = [];
        for (var i = 0; i < 5; i++) {
            fakeProducts.push(await IProduct.create({
                category: faker.helpers.arrayElement(fakeProductCategories),
                name: faker.commerce.productName(),
                desc: faker.commerce.productDescription(),
                cogs: parseInt(faker.commerce.price()),
                suggestedRetailPrice: Number.parseInt(faker.commerce.price())
            }));
        }
    });
    after(async function () {
        this.timeout(5000);
        await MIG_USER.down(sequelize.getQueryInterface());
        await MIG_PARTNER.down(sequelize.getQueryInterface());
        await MIG_PRODUCT.down(sequelize.getQueryInterface());
    });
    it('create table `consignment`', async function () {
        this.timeout(5000);
        await MIG_ORDER.up(sequelize.getQueryInterface());
        await new Promise(resolve => setTimeout(resolve, 2000));
    });
    it('create new IConsigment', async () => {
        fakeOrder = await IConsigment.create({
            date: new Date(),
            partnerId: BigInt(fakePartner.id),
        });
        const instance = await IConsigment.findByPk(fakeOrder.id, { rejectOnEmpty: true });
        expect(instance.id).equal(fakeOrder.id);
        // adding fake details
        for (var i = 0; i < faker.number.int({ min: 2, max: fakeProducts.length }); i++) {
            const xx = await IConsignmentDetail.create({
                orderId: BigInt(instance.id),
                productId: BigInt(fakeProducts[i].id),
                qty: faker.number.int({ min: 100, max: 10000 }),
                price: parseInt(faker.commerce.price())
            });
            fakeAmmount += xx.price * xx.qty;
        }
        // adding fake payments
        const xx = await IConsignmentPayed.create({
            orderId: BigInt(instance.id),
            ammount: fakeAmmount,
            method: PaymentMethod.accountTransfer,
            acc: "3224324324324"
        });
    });
    it('association: IConsigment `partner` ', async () => {
        var sp = await IConsigment.findByPk(1, { include: ['partner'] });
        expect(sp.partner?.id).equal(fakePartner.id);
        expect(sp.partner?.storeAddr).equal(fakePartner.storeAddr);
        // console.log(sp!.partner?.storeAddr == fakePartner.storeAddr, sp!.partner?.storeAddr, '=', fakePartner.storeAddr)
    });
    it('association: IConsigment `products` ', async () => {
        var sp = await IConsigment.findByPk(1, { include: ['products'] });
        expect(sp?.products).not.empty;
        expect(sp?.products?.length).greaterThan(0);
        expect(fakeAmmount).equal(sp.ammount());
        // console.log(sp?.products?.length);
        // for(var i=0; i<sp!.products!.length; i++){
        //   console.log(sp!.products![i]);
        // }
    });
    it('association: IConsigment `payments` ', async () => {
        var sp = await IConsigment.findByPk(1, { include: ['products', 'payments'] });
        // console.log(sp!.payments);
        expect(sp.payments).not.empty;
        expect(sp.payments.length).equal(1);
        expect(Number(sp.payments.at(0).ammount)).equal(Number(sp.ammount()));
    });
    it('association: IConsignmentDetail `consign` ', async () => {
        var xx = await IConsignmentDetail.findByPk(1, { include: ['consign'] });
        expect(xx?.consign?.id).equal(fakeOrder.id);
        // console.log(xx?.order);
    });
    it('drop table `orders`', async function () {
        this.timeout(5000);
        await MIG_ORDER.down(sequelize.getQueryInterface());
        // await new Promise(resolve => setTimeout(resolve, 2000));
    });
});

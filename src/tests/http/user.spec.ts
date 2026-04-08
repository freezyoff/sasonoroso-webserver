import * as chai from 'chai';
import request from 'supertest';
import {describe} from 'mocha'

import {server, app} from '../../index.ts'
import sequelize from '../../database/models/pool.ts';

const expect = chai.expect;

import MIG_USER from '../../database/migrations/20260326152754-create_table_user.ts'
import { faker } from '@faker-js/faker';
import { IUser } from '../../database/models/db.ts';
import { UserRole } from '../../database/models/user.ts';
import { log } from 'node:console';

const wrongData = {
  usrName: "hello",
  usrPwd: "hello",
  usrRole: "Admin",
  personIdNumber: "123",
  personName: "my name hello",
  personPhone: "1234567890"
};

const fakeData = {
  usrName: faker.internet.username(),
  usrPwd: faker.internet.password(),
  usrRole: faker.helpers.enumValue(UserRole),
  personIdNumber: faker.number.int({min: 1111111111, max:9999999999}),
  personName: faker.person.fullName(),
  personPhone: faker.phone.number()
}

var fakeResponse:IUser;

describe('> http: user.js', () => {

  before(async () => {
    await MIG_USER.down(sequelize.getQueryInterface());
    await MIG_USER.up(sequelize.getQueryInterface());
  })

  after(async ()=>{
    await MIG_USER.down(sequelize.getQueryInterface());
    server.close();
  })

  it('save: empty JSON', async ()=>{
    await request(app).post('/api/user/save')
      .send({})
      .set('Accept', 'application/json')
      .expect(422);
  })

  it('save: incomplete JSON params', async ()=>{
    let xxx = wrongData; 
    Reflect.deleteProperty(xxx, 'personIdNumber');
    await request(app).post('/api/user/save')
      .send(xxx)
      .set('Accept', 'application/json')
      .expect(422);
  })

  it('save: with unknown UserRole', async ()=>{
    await request(app).post('/api/user/save')
      .send(wrongData)
      .set('Accept', 'application/json')
      .expect(422);
  })

  it('save: insert', async ()=>{
    const response = await request(app).post('/api/user/save')
      .set('Accept', 'application/json')
      .send(fakeData)
      .expect(201);

    fakeResponse = response.body;
    // log("save: insert ", response.body);
  })

  it('save: update', async ()=>{
    fakeResponse.usrRole = UserRole.super;
    fakeResponse.personName = faker.person.fullName();
    const response = await request(app).post('/api/user/save')
      .send(fakeResponse)
      .set('Accept', 'application/json')
      .expect(200);
    // log("save: update ", response.body);
  })

  it('delete: unknown record', async ()=>{
    await request(app).post('/api/user/remove')
      .send({id:10})
      .set('Accept', 'application/json')
      .expect(422);
    // log("save: update ", response.body);
  })

  it('delete: known record', async ()=>{
    await request(app).post('/api/user/remove')
      .send({id:fakeResponse.id})
      .set('Accept', 'application/json')
      .expect(200);
    // log("save: update ", response.body);
  })

  it('fetch: all', async ()=>{
    const loop = 10;
    for (var i=0; i<loop; i++){
      await request(app).post('/api/user/save')
        .set('Accept', 'application/json')
        .send({
          usrName: faker.internet.username(),
          usrPwd: faker.internet.password(),
          usrRole: faker.helpers.enumValue(UserRole),
          personIdNumber: faker.number.int({min: 1111111111, max:9999999999}),
          personName: faker.person.fullName(),
          personPhone: faker.phone.number()
        })
        .expect(201);
    }
    const response = await request(app).post('/api/user/fetch')
      .send({})
      .set('Accept', 'application/json')
      .expect(200);
    expect(response.body.length).equal(loop+1);
    // log("fetch: all ", response.body);
  })

  it('fetch: limit', async ()=>{
    const response = await request(app).post('/api/user/fetch')
      .send({
        limit: 2,
        offset: 0,
      })
      .set('Accept', 'application/json')
      .expect(200);
    expect(response.body.length).equal(2);
    // log("fetch: all ", response.body);
  })

  it('fetch: limit offset', async ()=>{
    const response = await request(app).post('/api/user/fetch')
      .send({
        limit: 2,
        offset: 2,
      })
      .set('Accept', 'application/json')
      .expect(200);
    expect(response.body.length).equal(2);
    // log("fetch: all ", response.body);
  })

  it('fetch: limit offset order', async ()=>{
    const response = await request(app).post('/api/user/fetch')
      .send({
        limit: 2,
        offset: 0,
        order:[['id', 'DESC']]
      })
      .set('Accept', 'application/json')
      .expect(200);
    expect(response.body.length).equal(2);
    expect(response.body.at(0).id).equal(11+1);
    expect(response.body.at(1).id).equal(10+1);
    // log("fetch: limit offset order", response.body);
  })
});
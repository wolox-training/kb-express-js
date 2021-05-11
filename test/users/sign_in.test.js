const supertest = require('supertest');
const app = require('../../app');
const factory = require('../factory/users');
const { UNPROCESSABLE_ENTITY_ERROR, UNAUTHORIZED_ERROR } = require('../../app/errors');

const server = supertest(app);
let data = {};
let userTest = {};

describe('Signin suite tests', () => {
  beforeAll(async () => {
    data = { email: 'test@wolox.co', password: 'test1234' };
    userTest = await factory.attributes({ ...data, last_name: 'test' });
  });

  test('Token created OK', async done => {
    await server.post('/users').send(userTest);
    const result = await server.post('/users/sessions').send(data);

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty('token');
    done();
  });

  test('Email domain not allowed', async done => {
    await server.post('/users').send(userTest);
    const result = await server.post('/users/sessions').send({ ...data, email: 'test@gmail.com' });

    expect(result.statusCode).toBe(422);
    expect(result.body.internal_code).toBe(UNPROCESSABLE_ENTITY_ERROR);
    done();
  });

  test('Wrong password', async done => {
    await server.post('/users').send(userTest);
    const result = await server.post('/users/sessions').send({ ...data, password: 'wrong123' });

    expect(result.statusCode).toBe(401);
    expect(result.body.internal_code).toBe(UNAUTHORIZED_ERROR);
    done();
  });

  test('No mandatory fields', async done => {
    await server.post('/users').send(userTest);
    const result = await server.post('/users/sessions').send({});

    expect(result.statusCode).toBe(422);
    expect(result.body.internal_code).toBe(UNPROCESSABLE_ENTITY_ERROR);
    expect(result.body.message).toHaveProperty('email');
    expect(result.body.message).toHaveProperty('password');
    done();
  });
});

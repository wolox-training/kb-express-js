const supertest = require('supertest');
const app = require('../../app');
const factory = require('../factory/users');
const { CONFLICT_ERROR, UNPROCESSABLE_ENTITY_ERROR } = require('../../app/errors');

const server = supertest(app);

describe('Signup suite tests', () => {
  test('User created OK', async done => {
    const userTest = await factory.attributes({ last_name: 'test' });
    const result = await server.post('/users').send(userTest);

    expect(result.statusCode).toBe(201);
    done();
  });

  test('Email already exists', async done => {
    await factory.create({ email: 'test1@wolox.com', last_name: 'test' });
    const userTest = await factory.attributes({ email: 'test1@wolox.com', last_name: 'test' });
    const result = await server.post('/users').send(userTest);

    expect(result.statusCode).toBe(409);
    expect(result.body.internal_code).toBe(CONFLICT_ERROR);
    done();
  });

  test('Wrong password', async done => {
    const userTest = await factory.attributes({ password: 'abcdefg', last_name: 'test' });
    const result = await server.post('/users').send(userTest);

    expect(result.statusCode).toBe(422);
    expect(result.body.internal_code).toBe(UNPROCESSABLE_ENTITY_ERROR);
    done();
  });

  test('No mandatory fields', async done => {
    const result = await server.post('/users').send({});

    expect(result.statusCode).toBe(422);
    expect(result.body.internal_code).toBe(UNPROCESSABLE_ENTITY_ERROR);
    expect(result.body.message).toHaveProperty('name');
    expect(result.body.message).toHaveProperty('last_name');
    expect(result.body.message).toHaveProperty('email');
    expect(result.body.message).toHaveProperty('password');
    done();
  });
});

const supertest = require('supertest');
const app = require('../../app');
const { getToken, createRegularUser } = require('../tools');
const { UNAUTHORIZED_ERROR } = require('../../app/errors');

const server = supertest(app);
const userData = {
  email: 'test@wolox.co',
  password: 'test1234',
  last_name: 'test last name'
};

describe('Create Weets suite tests', () => {
  test('Weet created OK', async done => {
    await createRegularUser(userData);
    const token = await getToken(userData);

    const result = await server.post('/weets').set({ Authorization: token });

    expect(result.statusCode).toBe(201);
    done();
  });

  test('User no authenticated', async done => {
    const result = await server.post('/weets');

    expect(result.statusCode).toBe(401);
    expect(result.body.internal_code).toBe(UNAUTHORIZED_ERROR);
    done();
  });
});

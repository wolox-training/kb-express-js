const supertest = require('supertest');
const axios = require('axios');
const faker = require('faker');
const app = require('../../app');
const { getToken, createRegularUser } = require('../tools');
const { UNAUTHORIZED_ERROR } = require('../../app/errors');

const server = supertest(app);
const userData = {
  email: 'test@wolox.co',
  password: 'test1234',
  last_name: 'test last name'
};

jest.mock('axios');

describe('Create Weets suite tests', () => {
  beforeAll(() => {
    axios.get.mockResolvedValue({
      data: {
        joke: faker.lorem.word()
      }
    });
  });
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

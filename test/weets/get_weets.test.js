const supertest = require('supertest');
const app = require('../../app');
const factory = require('../factory/weets');
const { UNAUTHORIZED_ERROR, NOT_FOUND_ERROR } = require('../../app/errors');
const { getToken, createRegularUser } = require('../tools');

const server = supertest(app);
const userData = { email: 'test@wolox.co', password: 'test1234' };

describe('Get weets suite tests', () => {
  test('Return weets list OK', async done => {
    const newUser = await createRegularUser(userData);
    await factory.createMany(2, { userId: newUser.id });
    const token = await getToken(userData);

    const result = await server
      .get('/weets')
      .query({ per_page: 1 })
      .set({ Authorization: token });

    expect(result.statusCode).toBe(200);
    expect(result.body.all_items).toBe(2);
    expect(result.body.weets).toHaveLength(1);
    expect(result.body.weets[0]).toHaveProperty('id');
    expect(result.body.weets[0]).toHaveProperty('content');
    expect(result.body.weets[0]).toHaveProperty('user_id');
    expect(result.body.weets[0]).toHaveProperty('created_at');
    done();
  });

  test('Weets not found', async done => {
    await createRegularUser(userData);
    const token = await getToken(userData);
    const result = await server.get('/weets').set({ Authorization: token });

    expect(result.statusCode).toBe(404);
    expect(result.body.internal_code).toBe(NOT_FOUND_ERROR);
    done();
  });

  test('Unauthorized requests', async done => {
    const result = await server.get('/weets');

    expect(result.statusCode).toBe(401);
    expect(result.body.internal_code).toBe(UNAUTHORIZED_ERROR);
    done();
  });
});

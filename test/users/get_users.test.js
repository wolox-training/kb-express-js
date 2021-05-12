const supertest = require('supertest');
const app = require('../../app');
const factory = require('../factory/users');
const { UNAUTHORIZED_ERROR } = require('../../app/errors');

const server = supertest(app);
const userData = { email: 'test@wolox.co', password: 'test1234', last_name: 'Test las name' };

const creatUsers = async () => {
  const user1 = await factory.attributes(userData);
  const user2 = await factory.attributes({ ...userData, email: 'test2@wolox.co' });
  await server.post('/users').send(user1);
  await server.post('/users').send(user2);
};

const getToken = async () => {
  const result = await server.post('/users/sessions').send(userData);
  return result.body.token;
};

describe('Signin suite tests', () => {
  test('Return users list OK', async done => {
    await creatUsers();
    const token = await getToken();
    const result = await server.get('/users').set({ Authorization: token });

    expect(result.statusCode).toBe(200);
    expect(result.body.users).toHaveLength(2);
    expect(result.body.users[0]).toHaveProperty('id');
    expect(result.body.users[0]).toHaveProperty('name');
    expect(result.body.users[0]).toHaveProperty('last_name');
    expect(result.body.users[0]).toHaveProperty('email');
    done();
  });

  test('Unauthorized requests', async done => {
    const result = await server.get('/users');

    expect(result.statusCode).toBe(401);
    expect(result.body.internal_code).toBe(UNAUTHORIZED_ERROR);
    done();
  });
});

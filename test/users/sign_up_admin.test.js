const supertest = require('supertest');
const app = require('../../app');
const factory = require('../factory/users');
const { generateHash } = require('../../app/helpers/hash_texts');
const { getToken, createRegularUser } = require('../tools');
const { UNPROCESSABLE_ENTITY_ERROR, FORBIDDEN_ERROR } = require('../../app/errors');

const server = supertest(app);
const userData = {
  email: 'test@wolox.co',
  password: 'test1234',
  last_name: 'test last name'
};

const createAdminUser = async () => {
  await factory.create({ ...userData, role: '1', password: generateHash(userData.password) });
};

const regularTestData = {
  ...userData,
  email: 'test1@wolox.co'
};

describe('Signup admin suite tests', () => {
  test('User created OK', async done => {
    await createAdminUser();
    const token = await getToken(userData);
    const userTest = await factory.attributes({ ...userData, email: 'test2@wolox.co' });

    const result = await server
      .post('/admin/users')
      .send(userTest)
      .set({ Authorization: token });

    expect(result.statusCode).toBe(201);
    done();
  });

  test('Update existing user', async done => {
    await createAdminUser();
    const regularUser = await createRegularUser(regularTestData);
    const token = await getToken(userData);
    const userTest = await factory.attributes({ ...userData, email: regularUser.email });

    const result = await server
      .post('/admin/users')
      .send(userTest)
      .set({ Authorization: token });

    expect(result.statusCode).toBe(200);
    done();
  });

  test('User no admin try create admin', async done => {
    const regularUser = await createRegularUser(regularTestData);
    const token = await getToken({ ...userData, email: regularUser.email });
    const userTest = await factory.attributes({ ...userData, email: 'test2@wolox.co' });

    const result = await server
      .post('/admin/users')
      .send(userTest)
      .set({ Authorization: token });

    expect(result.statusCode).toBe(403);
    expect(result.body.internal_code).toBe(FORBIDDEN_ERROR);
    done();
  });

  test('No mandatory fields', async done => {
    await createAdminUser();
    const token = await getToken(userData);
    const result = await server
      .post('/admin/users')
      .send({})
      .set({ Authorization: token });

    expect(result.statusCode).toBe(422);
    expect(result.body.internal_code).toBe(UNPROCESSABLE_ENTITY_ERROR);
    expect(result.body.message).toHaveProperty('name');
    expect(result.body.message).toHaveProperty('last_name');
    expect(result.body.message).toHaveProperty('email');
    expect(result.body.message).toHaveProperty('password');
    done();
  });
});

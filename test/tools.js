const supertest = require('supertest');
const app = require('../app');
const factory = require('./factory/users');
const { generateHash } = require('../app/helpers/hash_texts');

const server = supertest(app);

exports.getToken = async userData => {
  const result = await server.post('/users/sessions').send(userData);
  return result.body.token;
};

exports.createRegularUser = async userData => {
  const user = await factory.create({
    ...userData,
    password: generateHash(userData.password)
  });
  return user;
};

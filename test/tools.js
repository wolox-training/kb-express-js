const supertest = require('supertest');
const app = require('../app');

const server = supertest(app);

exports.getToken = async userData => {
  const result = await server.post('/users/sessions').send(userData);
  return result.body.token;
};

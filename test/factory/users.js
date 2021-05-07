const { factory } = require('factory-girl');
const faker = require('faker');
const { User } = require('../../app/models');

factory.define('User', User, {
  name: faker.random.alpha(),
  lastName: faker.random.alpha(),
  email: faker.internet.email(null, null, 'wolox.co'),
  password: faker.random.alpha(8),
  last_name: faker.random.word()
});
module.exports = {
  create: params => factory.create('User', params),
  createMany: (num = 5, params) => factory.createMany('User', num, params),
  build: params => factory.build('User', params),
  attributes: params => factory.attrs('User', params)
};

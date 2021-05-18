const { factory } = require('factory-girl');
const faker = require('faker');
const { Weet } = require('../../app/models');

factory.define('Weet', Weet, {
  content: faker.lorem.words()
});
module.exports = {
  create: params => factory.create('Weet', params),
  createMany: (num = 5, params) => factory.createMany('Weet', num, params),
  build: params => factory.build('Weet', params),
  attributes: params => factory.attrs('Weet', params)
};

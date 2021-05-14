const user = require('./user');
const error = require('./error');
const weet = require('./weet');
const parameters = require('./parameters');

module.exports = {
  ...user,
  ...error,
  ...weet,
  ...parameters
};

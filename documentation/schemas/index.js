const user = require('./user');
const error = require('./error');
const weet = require('./weet');

module.exports = {
  ...user,
  ...error,
  ...weet
};

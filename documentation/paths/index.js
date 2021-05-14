const user = require('./user');
const admin = require('./admin');
const weets = require('./weets');

module.exports = {
  ...user,
  ...admin,
  ...weets
};

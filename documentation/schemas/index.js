const user = require('./user');
const error = require('./error');

module.exports = {
  ...user,
  ...error
};

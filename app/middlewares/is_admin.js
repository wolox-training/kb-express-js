const { forbiddenError } = require('../errors');
const { roles } = require('../../config/constants');

module.exports = (req, res, next) => {
  if (req.authUser.role === roles.ADMIN) {
    return next();
  }

  return next(forbiddenError('Access is only for admin'));
};

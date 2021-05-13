const { forbiddenError } = require('../errors');
const { roles } = require('../../config/constants');

module.exports = (req, res, next) => {
  try {
    if (req.authUser.role === roles.ADMIN) {
      return next();
    }

    return next(forbiddenError('Access is only for admin'));
  } catch (err) {
    return next(forbiddenError('Access is only for admin'));
  }
};

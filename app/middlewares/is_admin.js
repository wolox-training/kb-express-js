const { forbiddenError } = require('../errors');

module.exports = (req, res, next) => {
  try {
    if (req.authUser.isAdmin) {
      return next();
    }

    return next(forbiddenError('Access is only for admin'));
  } catch (err) {
    return next(forbiddenError('Access is only for admin'));
  }
};

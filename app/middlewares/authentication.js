const { getTokenFromReq } = require('../helpers/manage_jwt');
const { unauthorizedError } = require('../errors');

module.exports = (req, res, next) => {
  try {
    getTokenFromReq(req);
    return next();
  } catch (err) {
    return next(unauthorizedError('Access is private'));
  }
};

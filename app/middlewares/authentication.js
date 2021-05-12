const { getTokenFromReq } = require('../helpers/manage_jwt');
const { unauthorizedError } = require('../errors');

module.exports = (req, res, next) => {
  try {
    const tokenDecoded = getTokenFromReq(req);
    req.authUser = tokenDecoded.data.auth;
    return next();
  } catch (err) {
    return next(unauthorizedError('Access is private'));
  }
};

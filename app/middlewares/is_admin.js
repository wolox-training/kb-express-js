const { getTokenFromReq } = require('../helpers/manage_jwt');
const { forbiddenError } = require('../errors');

module.exports = (req, res, next) => {
  try {
    const dataToken = getTokenFromReq(req);

    if (dataToken.data.auth.isAdmin) {
      return next();
    }

    return next(forbiddenError('Access is only for admin'));
  } catch (err) {
    return next(forbiddenError('Access is only for admin'));
  }
};

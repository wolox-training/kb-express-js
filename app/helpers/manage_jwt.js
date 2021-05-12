const jwt = require('jwt-simple');
const config = require('../../config').common.crypt;

exports.generate = (data, expInSeconds) => {
  const iat = Date.now() / 1000;
  const exp = iat + expInSeconds;

  return jwt.encode({ exp, iat, data }, config.tokenSecret);
};

exports.decode = token => jwt.decode(token, config.tokenSecret);

exports.getTokenFromReq = req => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  return exports.decode(token);
};

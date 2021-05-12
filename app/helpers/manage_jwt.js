const jwt = require('jwt-simple');
const config = require('../../config').common.crypt;

exports.generate = (data, expInSeconds) => {
  const iat = Date.now() / 1000;
  const exp = iat + expInSeconds;

  return jwt.encode({ exp, iat, data }, config.tokenSecret);
};

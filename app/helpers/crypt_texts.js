const bcrypt = require('bcryptjs');
const config = require('../../config').common.crypt;

exports.generateHash = text => {
  const salt = bcrypt.genSaltSync(parseInt(config.salt));
  return bcrypt.hashSync(text, salt);
};

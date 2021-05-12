const signUp = require('./sign_up');
const signIn = require('./sign_in');

module.exports = {
  ...signUp,
  ...signIn
};

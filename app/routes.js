const { healthCheck } = require('./controllers/healthCheck');
const { signUp, getUsers } = require('./controllers/users');
const signUpSchema = require('./schemas/sign_up');
const authenticationMiddleware = require('./middlewares/authentication');

const validationSchema = require('./middlewares/validation_schema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [signUpSchema, validationSchema], signUp);
  app.get('/users', [authenticationMiddleware], getUsers);
};

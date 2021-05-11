const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers } = require('./controllers/users');
const signUpSchema = require('./schemas/sign_up');
const signInSchema = require('./schemas/sign_in');
const authenticationMiddleware = require('./middlewares/authentication');

const validationSchema = require('./middlewares/validation_schema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [signUpSchema, validationSchema], signUp);
  app.post('/users/sessions', [signInSchema, validationSchema], signIn);
  app.get('/users', [authenticationMiddleware], getUsers);
};

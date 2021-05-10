const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('./controllers/users');
const signUpSchema = require('./schemas/sign_up');
const signInSchema = require('./schemas/sign_in');

const validationSchema = require('./middlewares/validation_schema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [signUpSchema, validationSchema], signUp);
  app.post('/users/sessions', [signInSchema, validationSchema], signIn);
};

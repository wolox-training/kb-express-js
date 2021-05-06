const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/users');
const signUpSchema = require('./schemas/sign_up');

const validationSchema = require('./middlewares/validation_schema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', signUpSchema(), validationSchema, signUp);
};

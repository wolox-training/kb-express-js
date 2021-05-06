const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/users');
const signUpSchema = require('./schemas/signUp');

const validationSchema = require('./middlewares/validationSchema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [signUpSchema, validationSchema], signUp);
};

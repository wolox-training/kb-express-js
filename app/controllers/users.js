const { signUp: signUpService } = require('../services/users');
const { signUp: signUpMapper } = require('../mappers/users');
const { defaultError } = require('../errors');
const logger = require('../logger');

exports.signUp = async (req, res, next) => {
  try {
    const resultMapper = signUpMapper(req.body);
    const signUpResult = await signUpService(resultMapper);

    if (!signUpResult) {
      logger.error('User no created');
      return next(defaultError('User no created'));
    }

    logger.info(`User created ${req.body.name}`);
    return res.status(200).send(`User created ${req.body.name}`);
  } catch (error) {
    return next(error);
  }
};

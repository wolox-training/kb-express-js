const { createUser: signUpService, getUserByEmail } = require('../services/users');
const { signUp: mapperUser } = require('../mappers/users');
const { signUp: serializerUser } = require('../serializers/users');
const { defaultError, badRequestError } = require('../errors');
const logger = require('../logger');

exports.signUp = async (req, res, next) => {
  try {
    const userData = mapperUser(req.body);

    const existUser = await getUserByEmail(userData.email);
    if (existUser) {
      return next(badRequestError('Email already exists'));
    }

    const signUpResult = await signUpService(userData);

    if (!signUpResult) {
      logger.error('User no created');
      return next(defaultError('User no created'));
    }

    logger.info(`User created ${signUpResult.name}`);
    return res.status(200).send(serializerUser(signUpResult));
  } catch (error) {
    return next(error);
  }
};

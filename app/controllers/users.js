const { createUser: signUpService, getUserByEmail } = require('../services/users');
const { signUp: mapperUser } = require('../mappers/users');
const { signUp: serializerUser } = require('../serializers/users');
const { conflictError } = require('../errors');
const { generateHash } = require('../helpers/crypt_texts');
const logger = require('../logger');

exports.signUp = async (req, res, next) => {
  try {
    const userData = mapperUser(req.body);
    userData.password = generateHash(userData.password);
    const existUser = await getUserByEmail(userData.email);
    if (existUser) {
      return next(conflictError('Email already exists'));
    }

    const signUpResult = await signUpService(userData);
    logger.info(`User created ${signUpResult.name}`);
    return res.status(201).send(serializerUser(signUpResult));
  } catch (error) {
    return next(error);
  }
};

const { createUser: signUpService, getUserByEmail } = require('../services/users');
const { signUp: mapperUser } = require('../mappers/users');
const { signUp: serializerUser } = require('../serializers/users');
const { conflict } = require('../errors');
const { generateHash } = require('../helpers/crypt_texts');
const logger = require('../logger');

exports.signUp = async (req, res, next) => {
  try {
    const dataFromBody = req.body;
    dataFromBody.password = generateHash(dataFromBody.password);
    const userData = mapperUser(dataFromBody);

    const existUser = await getUserByEmail(userData.email);
    if (existUser) {
      return next(conflict('Email already exists'));
    }

    const signUpResult = await signUpService(userData);
    logger.info(`User created ${signUpResult.name}`);
    return res.status(200).send(serializerUser(signUpResult));
  } catch (error) {
    return next(error);
  }
};

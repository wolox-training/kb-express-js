const {
  createUser: signUpService,
  getUserByEmail,
  createToken: signInService
} = require('../services/users');
const { signUp: mapperUser, signIn: mapperSignIn } = require('../mappers/users');
const { signUp: serializerUser, signIn: serializerSignIn } = require('../serializers/users');
const { conflictError, unauthorizedError } = require('../errors');
const { generateHash, verify } = require('../helpers/hash_texts');
const { encrypt } = require('../helpers/manage_crypt');
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

exports.signIn = async (req, res, next) => {
  try {
    const userData = await mapperSignIn(req.body);
    const existUser = await getUserByEmail(userData.email);

    if (!existUser) {
      return next(unauthorizedError('User not found'));
    }

    if (!verify(userData.password, existUser.password)) {
      return next(unauthorizedError('User not found'));
    }

    const encryptedId = encrypt(String(existUser.id));
    const token = signInService({ id: encryptedId });
    logger.info(`Token created ${token}`);
    return res.status(200).send(serializerSignIn(token));
  } catch (error) {
    return next(error);
  }
};

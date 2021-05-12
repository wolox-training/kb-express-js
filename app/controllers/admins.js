const { createUser: signUpService, getUserByEmail, makeAdminUser } = require('../services/users');
const { signUp: mapperUser } = require('../mappers/users');
const { signUp: serializerUser } = require('../serializers/users');
const { generateHash } = require('../helpers/hash_texts');
const logger = require('../logger');

exports.signUpAdmin = async (req, res, next) => {
  try {
    const userData = mapperUser(req.body);
    userData.password = generateHash(userData.password);
    userData.isAdmin = true;
    const existUser = await getUserByEmail(userData.email);
    if (existUser) {
      const updateResult = await makeAdminUser(userData.email);
      logger.info(`User maked admin ${updateResult.name}`);
      return res.status(200).send(serializerUser(updateResult));
    }

    const signUpResult = await signUpService(userData);
    logger.info(`User created ${signUpResult.name}`);
    return res.status(201).send(serializerUser(signUpResult));
  } catch (error) {
    return next(error);
  }
};

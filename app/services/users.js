const { User: UserModel } = require('../models');
const { databaseError } = require('../errors');
const { userService: userServicePath } = require('../../config/constants').loggerPaths;
const logger = require('../logger');
const { generate: generateJwt } = require('../helpers/manage_jwt');

exports.getUserByEmail = async email => {
  try {
    const result = await UserModel.findOne({ where: { email } });
    return result;
  } catch (error) {
    logger.error(`${userServicePath} --- Error db getting user --- ${error}`);
    throw databaseError('Error getting user');
  }
};

exports.createUser = async ({ name, lastName, email, password }) => {
  try {
    const creationResult = await UserModel.create({
      name,
      lastName,
      password,
      email
    });
    return creationResult;
  } catch (error) {
    logger.error(`${userServicePath} --- Error db signUp user --- ${error}`);
    throw databaseError('Error signUp user');
  }
};

exports.createToken = ({ id }) => {
  try {
    const token = generateJwt({ id }, 3600 * 24);
    return token;
  } catch (error) {
    logger.error(`${userServicePath} --- Error db signUp user --- ${error}`);
    throw databaseError('Error signUp user');
  }
};

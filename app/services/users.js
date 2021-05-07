const { User: UserModel } = require('../models');
const { databaseError } = require('../errors');
const { userService: userServicePath } = require('../../config/constants').loggerPaths;
const logger = require('../logger');

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

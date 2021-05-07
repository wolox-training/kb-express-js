const { User: UserModel } = require('../models');
const { databaseError } = require('../errors');
const logger = require('../logger');

const pathLogger = 'services:users';

exports.getUserByEmail = async email => {
  try {
    const result = await UserModel.findOne({ where: { email } });
    return result;
  } catch (error) {
    logger.error(`${pathLogger} --- Error db getting user --- ${error}`);
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
    logger.error(`${pathLogger} --- Error db signUp user --- ${error}`);
    throw databaseError('Error signUp user');
  }
};

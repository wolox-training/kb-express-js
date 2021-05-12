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

exports.createUser = async ({ name, lastName, email, password, isAdmin = false }) => {
  try {
    const creationResult = await UserModel.create({
      name,
      lastName,
      password,
      email,
      isAdmin
    });
    return creationResult;
  } catch (error) {
    logger.error(`${userServicePath} --- Error db signUp user --- ${error}`);
    throw databaseError('Error signUp user');
  }
};

exports.makeAdminUser = async email => {
  try {
    const updatedUser = await UserModel.update(
      {
        isAdmin: true
      },
      {
        where: { email },
        returning: true,
        plain: true
      }
    );
    return updatedUser[1];
  } catch (error) {
    logger.error(`${userServicePath} --- Error db making admin user --- ${error}`);
    throw databaseError('Error making admin user');
  }
};

exports.getUsers = async ({ limit, offset }) => {
  try {
    const users = await UserModel.findAndCountAll({ offset, limit });
    return users;
  } catch (error) {
    logger.error(`${userServicePath} --- Error db getting users list --- ${error}`);
    throw databaseError('Error getting users list');
  }
};

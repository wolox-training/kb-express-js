const { User: UserModel } = require('../models');
const { databaseError, badRequestError } = require('../errors');
const logger = require('../logger');
const config = require('../../config').common.business;
const { generateHash } = require('../helpers/crypt_texts');

const pathLogger = 'services:users';

const getUser = async email => {
  try {
    const result = await UserModel.findOne({ where: { email } });
    return result;
  } catch (error) {
    logger.error(`${pathLogger} --- Error db getting user --- ${error}`);
    throw databaseError('Error getting user');
  }
};

const emailIsValid = email => {
  const regex = new RegExp(config.allowedEmailDomains);
  return regex.test(email);
};

const passwordIsValid = password => /^([a-zA-Z0-9_-]){8}$/.test(password);

exports.signUp = async ({ name, lastName, email, password }) => {
  if (!emailIsValid(email)) {
    throw badRequestError('Allowed domain for email are domains of Wolox');
  }

  const existUser = await getUser(email);
  if (existUser) {
    throw badRequestError('Email already exists');
  }

  if (!passwordIsValid(password)) {
    throw badRequestError('The password does not meet the requirements');
  }

  try {
    const creationResult = await UserModel.create({
      name,
      lastName,
      password: generateHash(password),
      email
    });
    return creationResult;
  } catch (error) {
    logger.error(`${pathLogger} --- Error db signUp user --- ${error}`);
    throw databaseError('Error signUp user');
  }
};

const { Weet: WeetModel } = require('../models');
const { databaseError } = require('../errors');
const { weetService: weetServicePath } = require('../../config/constants').loggerPaths;
const logger = require('../logger');

exports.createWeet = ({ content, userId }) =>
  WeetModel.create({
    content,
    userId
  }).catch(error => {
    logger.error(`${weetServicePath} --- Error db creating weet --- ${error}`);
    throw databaseError('Error creating weet');
  });

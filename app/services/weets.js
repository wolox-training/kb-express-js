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

exports.getWeets = ({ limit, offset }) =>
  WeetModel.findAndCountAll({ offset, limit })
    .then(result => ({ count: result.count, weets: result.rows }))
    .catch(error => {
      logger.error(`${weetServicePath} --- Error db getting weets list --- ${error}`);
      throw databaseError('Error getting weets list');
    });

const { body } = require('express-validator');

module.exports = body('name')
  .not()
  .trim()
  .isEmpty()
  .withMessage('is required');

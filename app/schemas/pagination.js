const { query } = require('express-validator');

module.exports = [
  query('current_page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('must be a integer greater than 0'),
  query('per_page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('must be a integer greater than 0')
];

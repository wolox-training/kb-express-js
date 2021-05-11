const { body } = require('express-validator');
const signInSchema = require('./sign_in');

module.exports = [
  body('name')
    .trim()
    .isString()
    .notEmpty()
    .exists()
    .withMessage('is required'),
  body('last_name')
    .trim()
    .isString()
    .notEmpty()
    .exists()
    .withMessage('is required'),
  ...signInSchema
];

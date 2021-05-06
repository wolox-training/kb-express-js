const { body } = require('express-validator');

module.exports = () => [
  body('name')
    .not()
    .trim()
    .isEmpty()
    .withMessage('is required'),
  body('last_name')
    .not()
    .trim()
    .isEmpty()
    .withMessage('is required'),
  body('email')
    .not()
    .trim()
    .isEmpty()
    .withMessage('is required'),
  body('password')
    .not()
    .trim()
    .isEmpty()
    .withMessage('is required')
];

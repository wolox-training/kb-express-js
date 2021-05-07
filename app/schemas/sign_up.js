const { body } = require('express-validator');
const { allowedEmailDomains } = require('../../config').common.business;

module.exports = [
  body('name')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('is required'),
  body('last_name')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('is required'),
  body('email')
    .matches(allowedEmailDomains)
    .withMessage('allowed domain are domains of Wolox'),
  body('email')
    .isEmail()
    .withMessage('must be a valid email'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('is required'),
  body('password')
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage('must be alphanumeric and have a minimum of 8 characters'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('is required')
];

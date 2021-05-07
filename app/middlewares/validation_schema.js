const { validationResult } = require('express-validator');
const { unprocessableEntityError } = require('../errors');

const getFormattedErrors = rawErrors =>
  rawErrors.reduce((acc, curr) => ({ ...acc, [curr.param]: curr.msg }), {});

const validationSchema = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const formattedErrors = getFormattedErrors(errors.array());
  return next(unprocessableEntityError(formattedErrors));
};

module.exports = validationSchema;

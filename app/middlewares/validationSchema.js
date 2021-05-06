const { validationResult } = require('express-validator');
const { badRequest } = require('../errors');

const getFormattedErrors = rawErrors =>
  rawErrors.reduce((acc, curr) => ({ ...acc, [curr.param]: curr.msg }), {});

const validationSchema = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = getFormattedErrors(errors.array());
    return next(badRequest(formattedErrors));
  }

  return next();
};

module.exports = validationSchema;

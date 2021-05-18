const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.BAD_REQUEST = 'bad_request';
exports.badRequestError = message => internalError(message, exports.BAD_REQUEST);

exports.UNPROCESSABLE_ENTITY_ERROR = 'unprocessable_entity_error';
exports.unprocessableEntityError = message => internalError(message, exports.UNPROCESSABLE_ENTITY_ERROR);

exports.CONFLICT_ERROR = 'conflict_error';
exports.conflictError = message => internalError(message, exports.CONFLICT_ERROR);

exports.UNAUTHORIZED_ERROR = 'unauthorized_error';
exports.unauthorizedError = message => internalError(message, exports.UNAUTHORIZED_ERROR);

exports.FORBIDDEN_ERROR = 'forbidden_error';
exports.forbiddenError = message => internalError(message, exports.FORBIDDEN_ERROR);

exports.NOT_FOUND_ERROR = 'not_found_error';
exports.notFoundError = message => internalError(message, exports.NOT_FOUND_ERROR);

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

exports.UNPROCESSABLE_ENTITY = 'unprocessable_entity';
exports.unprocessableEntity = message => internalError(message, exports.UNPROCESSABLE_ENTITY);

exports.CONFLICT = 'conflict';
exports.conflict = message => internalError(message, exports.CONFLICT);

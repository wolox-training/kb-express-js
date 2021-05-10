module.exports = {
  internalCodeError: {
    type: 'string'
  },
  StringError: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      },
      internal_code: {
        $ref: '#/components/schemas/internalCodeError'
      }
    }
  },
  ObjectError: {
    type: 'object',
    properties: {
      message: {
        type: 'object'
      },
      internal_code: {
        $ref: '#/components/schemas/internalCodeError'
      }
    }
  }
};

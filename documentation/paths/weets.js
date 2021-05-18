module.exports = {
  '/weets': {
    post: {
      tags: ['Create weets'],
      description: 'Create weet',
      operationId: 'createWeet',
      parameters: [],
      responses: {
        201: {
          description: 'New weet was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Weet'
              }
            }
          }
        },
        401: {
          description: 'User no authenticated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'Access is private',
                internal_code: 'unauthorized_error'
              }
            }
          }
        },
        500: {
          description: 'Unexpected error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'Wrong response of quotes api',
                internal_code: 'default_error'
              }
            }
          }
        },
        503: {
          description: 'Internal error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'Error creating weet',
                internal_code: 'database_error'
              }
            }
          }
        }
      }
    },
    get: {
      tags: ['Get weets list'],
      description: 'Get weets list',
      operationId: 'getWeets',
      parameters: [{ $ref: '#/components/schemas/PerPage' }, { $ref: '#/components/schemas/CurrentPage' }],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Weets list',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Weets'
              }
            }
          }
        },
        401: {
          description: 'User no authenticated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'Access is private',
                internal_code: 'unauthorized_error'
              }
            }
          }
        },
        404: {
          description: 'Weets not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'Weets not found',
                internal_code: 'not_found_error'
              }
            }
          }
        },
        503: {
          description: 'Internal error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'Error getting users list',
                internal_code: 'database_error'
              }
            }
          }
        }
      }
    }
  }
};

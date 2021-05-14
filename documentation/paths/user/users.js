module.exports = {
  '/users': {
    post: {
      tags: ['Create users'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreationUser'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        422: {
          description: 'Invalid parameters in request body',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ObjectError'
              },
              example: {
                message: {
                  name: 'is required'
                },
                internal_code: 'unprocessable_entity_error'
              }
            }
          }
        },
        409: {
          description: 'Email already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'Email already exists',
                internal_code: 'conflict_error'
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
                message: 'Error signUp user',
                internal_code: 'database_error'
              }
            }
          }
        }
      }
    },
    get: {
      tags: ['Get users list'],
      description: 'Get users list',
      operationId: 'getUsers',
      parameters: [],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'New user was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Users'
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

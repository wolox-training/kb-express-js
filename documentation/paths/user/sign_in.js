module.exports = {
  '/users/sessions': {
    post: {
      tags: ['Create token'],
      description: 'Create token',
      operationId: 'createToken',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreationToken'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'Token was created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    example: 'asdfsdfdddddddasdfasdsdfasdas'
                  }
                }
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
                  email: 'is required'
                },
                internal_code: 'unprocessable_entity_error'
              }
            }
          }
        },
        401: {
          description: 'Email or password invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'User not found',
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
                message: 'Error getting user',
                internal_code: 'database_error'
              }
            }
          }
        }
      }
    }
  }
};

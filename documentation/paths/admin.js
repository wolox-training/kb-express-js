module.exports = {
  '/admin/users': {
    post: {
      tags: ['Create admin users'],
      description: 'Create admin user',
      operationId: 'createAdminUser',
      parameters: [],
      security: [
        {
          bearerAuth: []
        }
      ],
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
          description: 'New admin user was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        200: {
          description: 'New admin user was updated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        401: {
          description: 'Invalid parameters in request body',
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
        403: {
          description: 'Email already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StringError'
              },
              example: {
                message: 'Access is only for admin',
                internal_code: 'forbidden_error'
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
    }
  }
};

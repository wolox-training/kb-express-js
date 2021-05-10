module.exports = {
  userId: {
    type: 'integer',
    example: 7
  },
  name: {
    type: 'string',
    example: 'Pepito'
  },
  last_name: {
    type: 'string',
    example: 'Pérez'
  },
  userEmail: {
    type: 'string',
    example: 'pepito.perez@wolox.co'
  },
  password: {
    type: 'string',
    example: 'Test1234',
    minimum: 8
  },
  CreationUser: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      last_name: {
        $ref: '#/components/schemas/name'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  User: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/userId'
          }
        }
      },
      { $ref: '#/components/schemas/CreationUser' }
    ]
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};

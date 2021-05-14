module.exports = {
  weetId: {
    type: 'integer',
    example: 7
  },
  content: {
    type: 'string',
    example: 'Test content for weet',
    maximum: 140
  },
  createdAt: {
    type: 'string',
    format: 'date',
    example: '2021-05-13T21:08:09.073Z'
  },
  Weet: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/weetId'
      },
      content: {
        $ref: '#/components/schemas/content'
      },
      user_id: {
        $ref: '#/components/schemas/userId'
      },
      created_at: {
        $ref: '#/components/schemas/createdAt'
      }
    }
  },
  Weets: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Weet'
        }
      }
    }
  }
};

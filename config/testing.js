exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    crypt: {
      tokenSecret: 'test',
      cryptSecret: 'test'
    },
    business: {
      allowedEmailDomains: '@wolox(?:.co|.ar|.com)$'
    },
    session: {
      secret: 'some-super-secret'
    }
  }
};

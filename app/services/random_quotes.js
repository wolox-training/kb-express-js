const { getRequest } = require('../helpers/http_requests');
const { defaultError } = require('../errors');
const config = require('../../config').common;

exports.getRandomQuote = async () => {
  try {
    const result = await getRequest(config.url_quotes_api);
    return result.data.joke;
  } catch (error) {
    throw defaultError('Wrong response of quotes api');
  }
};

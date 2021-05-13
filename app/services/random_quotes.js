const { getRequest } = require('../helpers/http_requests');
const { defaultError } = require('../errors');
const config = require('../../config').common.quoteApi;

exports.getRandomQuote = async maxLength => {
  try {
    const result = await getRequest(config.url);
    return result.data.joke.substring(0, maxLength);
  } catch (error) {
    throw defaultError('Wrong response of quotes api');
  }
};

const { getRequest } = require('../helpers/http_requests');
const { defaultError } = require('../errors');

exports.getRandomQuote = async () => {
  try {
    const result = await getRequest('https://geek-jokes.sameerkumar.website/api?format=json');
    return result.data.joke;
  } catch (error) {
    throw defaultError('Wrong response of quotes api');
  }
};

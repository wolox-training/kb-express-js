const { createWeet: createWeetService } = require('../services/weets');
const { getRandomQuote } = require('../services/random_quotes');
const { weet: weetSerializer } = require('../serializers/weets');
const logger = require('../logger');

exports.create = async (req, res, next) => {
  try {
    const randomWeetContent = await getRandomQuote(140);
    const weetResult = await createWeetService({ content: randomWeetContent, userId: req.authUser.id });

    logger.info(`Weet created ${weetResult.id}`);
    return res.status(201).send(weetSerializer(weetResult));
  } catch (error) {
    return next(error);
  }
};

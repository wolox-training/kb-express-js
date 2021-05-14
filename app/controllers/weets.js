const { createWeet: createWeetService, getWeets } = require('../services/weets');
const mapperPagination = require('../mappers/pagination');
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

exports.getWeets = async (req, res, next) => {
  try {
    const pagination = mapperPagination(req.query.current_page, req.query.per_page);
    const { count, weets } = await getWeets(pagination);
    const weetsResponse = weets.map(weet => weetSerializer(weet));

    return await res.status(200).send({ weets: weetsResponse, all_items: count });
  } catch (error) {
    return next(error);
  }
};

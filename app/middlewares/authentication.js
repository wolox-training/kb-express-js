module.exports = (req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next(err);
  }
};

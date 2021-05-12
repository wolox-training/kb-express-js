module.exports = (currentPage = 1, perPage = 10) => ({
  limit: perPage,
  offset: perPage * (currentPage - 1)
});

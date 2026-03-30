const sortingFilters = (req, res, next) => {
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  const sortBy = req.query.sortBy
    ? { [req.query.sortBy]: sortOrder }
    : { createdAt: sortOrder };
  req.sortOptions = sortBy;
  next();
};

export default sortingFilters;

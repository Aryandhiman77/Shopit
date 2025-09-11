const AsyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err)); // goes to errorHandler middleware
  };
};

export default AsyncWrapper;

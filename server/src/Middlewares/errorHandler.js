const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];

    return res.status(409).json({
      success: false,
      message: `Duplicate entry already exists`,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
export default errorHandler;

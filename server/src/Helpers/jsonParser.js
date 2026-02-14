// middlewares/jsonParser.js
export const jsonParser = (fields) => {
  return (req, res, next) => {
    fields?.forEach((field) => {
      if (req.body[field]) {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid JSON format for attributes",
            error: err,
          });
        }
      }
    });

    next();
  };
};

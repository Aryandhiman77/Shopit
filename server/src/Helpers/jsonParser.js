// middlewares/jsonParser.js
export const jsonParser = (fields = []) => {
  return (req, res, next) => {
    if (req.body.attributes) {
      try {
        req.body.attributes = JSON.parse(req.body.attributes);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format for attributes",
        });
      }
    }
    next();
  };
};

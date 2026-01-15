import ApiError from "../Helpers/ApiError.js";

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedData = await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      req.data = validatedData;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json(
        new ApiError(
          400,
          "Validation failed.",
          error.details.map((err) => err.message)
        )
      );
    }
  };
};

export default validate;

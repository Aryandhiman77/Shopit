import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().lowercase().min(3).max(25).required().messages({
    "string.min": "Category name must be at least 2 characters long.",
    "string.max": "Category name must be less than 25 characters.",
    "any.required": "Category name is required.",
    "string.empty": "Category name cannot be empty.",
  }),
  parent: Joi.string().lowercase().min(3).max(35).optional().messages({
    "string.min": "Parent Category slug must be at least 3 characters long.",
    "string.max": "Parent Category slug must be less than 30 characters.",
    "string.empty": "Parent Category slug cannot be empty.",
  }),
  level: Joi.number().allow(1, 2, 3).optional().messages({
    "string.length": "Category level must be single digit.",
    "string.pattern": "Category level must be either 1,2 or 3",
    "string.empty": "Category level cannot be empty.",
  }),
});

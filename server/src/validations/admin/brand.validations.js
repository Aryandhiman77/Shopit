import Joi from "joi";
import Categories from "../../Models/category.js";
export const createBrandSchema = Joi.object({
  name: Joi.string().lowercase().min(3).max(40).required().messages({
    "string.min": "Brand name must be at least 3 characters long.",
    "string.max": "Brand name must be less than 40 characters.",
    "any.required": "Brand name is required.",
    "string.empty": "Brand name cannot be empty.",
  }),
  description: Joi.string().lowercase().min(10).max(300).messages({
    "string.min": "Brand description must be at least 3 characters long.",
    "string.max": "Brand description must be less than 200 characters.",
    "any.required": "Brand description is required.",
    "string.empty": "Brand description cannot be empty.",
  }),
  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be true or false.",
  }),
  isVerified: Joi.boolean().messages({
    "boolean.base": "isActive must be true or false.",
  }),
  categories: Joi.array()
    .items(Joi.string())
    .external(async (value) => {
      const categoryIds = [];
      for (const slug of value) {
        const category = await Categories.findOne({ slug });
        if (!category) {
          throw new Joi.ValidationError("Category does not exist.", [
            {
              message: `Category "${slug}" does not exist.`,
              path: ["category"],
              type: "any.valid",
              context: { label: "category", value: slug },
            },
          ]);
        }
        categoryIds.push(category._id);
      }
      return categoryIds;
    })
    .messages({
      "any.required": "Category is required.",
      "array.base": "Category is required.",
    }),
});
export const updateBrandSchema = Joi.object({
  name: Joi.string()
    .lowercase()
    .min(3)
    .max(40)
    .required()
    .messages({
      "string.min": "Brand name must be at least 3 characters long.",
      "string.max": "Brand name must be less than 40 characters.",
      "any.required": "Brand name is required.",
      "string.empty": "Brand name cannot be empty.",
    })
    .optional(),
  description: Joi.string().lowercase().min(10).max(300).messages({
    "string.min": "Brand description must be at least 3 characters long.",
    "string.max": "Brand description must be less than 200 characters.",
    "any.required": "Brand description is required.",
    "string.empty": "Brand description cannot be empty.",
  }).optional(),
  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be true or false.",
  }).optional(),
  isVerified: Joi.boolean().messages({
    "boolean.base": "isActive must be true or false.",
  }).optional(),
  categories: Joi.array()
    .items(Joi.string())
    .external(async (value) => {
      const categoryIds = [];
      for (const slug of value) {
        const category = await Categories.findOne({ slug });
        if (!category) {
          throw new Joi.ValidationError("Category does not exist.", [
            {
              message: `Category "${slug}" does not exist.`,
              path: ["category"],
              type: "any.valid",
              context: { label: "category", value: slug },
            },
          ]);
        }
        categoryIds.push(category._id);
      }
      return categoryIds;
    }).optional()
    .messages({
      "any.required": "Category is required.",
      "array.base": "Category is required.",
    }),
});

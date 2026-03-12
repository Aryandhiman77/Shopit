import Joi from "joi";
import Categories from "../../Models/category.js";
export const createBrandSchema = Joi.object({
  name: Joi.string().lowercase().min(3).max(40).required().messages({
    "string.min": "Brand name must be at least 3 characters long.",
    "string.max": "Brand name must be less than 40 characters.",
    "any.required": "Brand name is required.",
    "string.empty": "Brand name cannot be empty.",
  }),
  description: Joi.string().lowercase().min(10).max(400).messages({
    "string.min": "Brand description must be at least 3 characters long.",
    "string.max": "Brand description must be less than 400 characters.",
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
    .required()
    .external(async (value) => {
      const categoryData = await Categories.find({
        _id: { $in: [...(value || [])] },
      })
        .select("_id name")
        .lean();
      if (categoryData?.length !== value?.length) {
        const invalidCategorories = [];
        categoryData?.forEach((cat, i) => {
          const isValid = value.includes(cat?._id);
          if (!isValid) {
            invalidCategorories.push(i + 1);
          }
        });
        const formattedInvalidCategories = invalidCategorories
          ?.map((cat) => cat)
          .join(", ");
        throw new Joi.ValidationError("Invalid Categories.", [
          {
            message: `Categories ("${formattedInvalidCategories}") does not exist.`,
            path: ["category"],
            type: "any.valid",
            context: { label: "category", value: formattedInvalidCategories },
          },
        ]);
      }
      return value;
    })
    .messages({
      "any.required": "Category is required.",
      "array.base": "Category is required.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "Extra fields are not allowed.",
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
  description: Joi.string()
    .lowercase()
    .min(10)
    .max(400)
    .messages({
      "string.min": "Brand description must be at least 3 characters long.",
      "string.max": "Brand description must be less than 400 characters.",
      "any.required": "Brand description is required.",
      "string.empty": "Brand description cannot be empty.",
    })
    .optional(),
  isActive: Joi.boolean()
    .messages({
      "boolean.base": "isActive must be true or false.",
    })
    .optional(),
  isVerified: Joi.boolean()
    .messages({
      "boolean.base": "isActive must be true or false.",
    })
    .optional(),
  categories: Joi.array()
    .items(Joi.string())
    .optional()
    .external(async (value) => {
      if (!value && !value?.length) return value;
      const categoryData = await Categories.find({
        _id: { $in: [...(value || [])] },
      })
        .select("_id name")
        .lean();
      if (categoryData?.length !== value?.length) {
        const invalidCategorories = [];
        categoryData?.forEach((cat, i) => {
          const isValid = value.includes(cat?._id);
          if (!isValid) {
            invalidCategorories.push(i + 1);
          }
        });
        const formattedInvalidCategories = invalidCategorories
          ?.map((cat) => cat)
          .join(", ");
        throw new Joi.ValidationError("Invalid Categories.", [
          {
            message: `Categories ("${formattedInvalidCategories}") does not exist.`,
            path: ["category"],
            type: "any.valid",
            context: { label: "category", value: formattedInvalidCategories },
          },
        ]);
      }
      return value;
    }),
});

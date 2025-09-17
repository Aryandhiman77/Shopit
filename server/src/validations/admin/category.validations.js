import Joi, { options } from "joi";

const attributeSchema = Joi.object({
  name: Joi.string().lowercase().min(3).max(25).required().messages({
    "string.base": "Attribute name must be a string.",
    "string.min": "Attribute name must be at least 3 characters long.",
    "string.max": "Attribute name must be less than 25 characters.",
    "any.required": "Attribute name is required.",
    "string.empty": "Attribute name cannot be empty.",
  }),

  inputType: Joi.string()
    .valid("string", "number", "boolean", "select")
    .required()
    .messages({
      "string.base": "Input type must be a string.",
      "any.only": "Input type must be one of: string, number, boolean, select.",
      "any.required": "Input type is required.",
      "string.empty": "Input type cannot be empty.",
    }),

  options: Joi.when("inputType", {
    is: "select",
    then: Joi.array()
      .items(
        Joi.string().min(1).max(50).messages({
          "string.base": "Each option must be a string.",
          "string.min": "Option must be at least 1 character long.",
          "string.max": "Option must not exceed 50 characters.",
          "string.empty": "Option cannot be empty.",
        })
      )
      .max(30)
      .required()
      .messages({
        "array.base": "Options must be an array of strings.",
        "array.max": "Options cannot exceed 30 values.",
        "any.required": "Options are required when inputType is 'select'.",
      }),
    otherwise: Joi.forbidden().messages({
      "any.unknown": "Options are only allowed when inputType is 'select'.",
    }),
  }),
}).messages({
  "object.unknown": "Extra fields are not allowed inside attributes.",
});
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
  level: Joi.number().valid(1, 2, 3).optional().messages({
    "any.only": "Category level must be either 1, 2, or 3",
    "number.base": "Category level must be a number",
    "any.required": "Category level is required",
  }),
  attributes: Joi.array().items(attributeSchema).max(20).optional().messages({
    "array.base": "Attributes must be an array.",
    "array.max": "Attributes cannot exceed 20.",
  }),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().lowercase().min(3).max(25).required().messages({
    "string.min": "Category name must be at least 2 characters long.",
    "string.max": "Category name must be less than 25 characters.",
    "any.required": "Category name is required.",
    "string.empty": "Category name cannot be empty.",
  }),
  level: Joi.number().valid(1, 2, 3).required().messages({
    "any.only": "Category level must be either 1, 2, or 3",
    "number.base": "Category level must be a number",
    "any.required": "Category level is required",
  }),
  isActive: Joi.boolean().required().messages({
    "boolean.base": "Category status must be either true or false",
    "any.required": "Category status is required.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "Extra fields are not allowed in category.",
  });

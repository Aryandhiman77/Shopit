import Joi from "joi";

const attributeSchema = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().lowercase().min(3).max(25).required().messages({
        "string.min": "Attribute name must be at least 3 characters long.",
        "string.max": "Attribute name must be less than 25 characters.",
        "any.required": "Attribute name is required.",
        "string.empty": "Attribute name cannot be empty.",
      }),
      inputType: Joi.string()
        .valid("string", "number", "boolean", "select")
        .required()
        .messages({
          "any.only":
            "Input type must be one of: string, number, boolean, select.",
          "any.required": "Input type is required.",
        }),
      options: Joi.array()
        .items(Joi.string())
        .max(30)
        .when("inputType", {
          is: "select",
          then: Joi.required().messages({
            "any.required": "Options are required when inputType is select.",
          }),
          otherwise: Joi.forbidden().messages({
            "any.unknown":
              "Options field is only allowed when inputType is select.",
          }),
        }),
    }).unknown(false)
  )
  .messages({
    "array.base": "Attributes must be an array of objects.",
    "array.includes": "Each attribute must be a valid object.",
  })
  .optional();

export const createCategorySchema = Joi.object({
  name: Joi.string().lowercase().min(3).max(25).required().messages({
    "string.min": "Category name must be at least 3 characters long.",
    "string.max": "Category name must be less than 25 characters.",
    "any.required": "Category name is required.",
    "string.empty": "Category name cannot be empty.",
  }),
  parent: Joi.string().lowercase().min(3).max(35).optional().messages({
    "string.min": "Parent Category slug must be at least 3 characters long.",
    "string.max": "Parent Category slug must be less than 30 characters.",
    "string.empty": "Parent Category slug cannot be empty.",
  }),
  level: Joi.number().valid(1, 2, 3).required().messages({
    "any.only": "Category level must be either 1, 2, or 3.",
    "number.base": "Category level must be a number.",
    "any.required": "Category level is required.",
  }),
  attributes: attributeSchema,
})
  .unknown(false)
  .messages({
    "object.unknown": "Extra fields are not allowed.",
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
  attributes: attributeSchema,
})
  .unknown(false)
  .messages({
    "object.unknown": "Extra fields are not allowed in category.",
  });

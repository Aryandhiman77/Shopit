import Joi from "joi";
import Categories from "../../Models/category.js";

const attributeSchema = Joi.array().items(
  Joi.object().external(async (value) => {
    console.log(value);
    // return value;

    required: false;
  })
);

const variantItemSchema = Joi.object({
  variantTitle: Joi.string().lowercase().min(5).max(80).required().messages({
    "string.min": "Product title be at least 3 characters long.",
    "string.max": "Product title be less than 80 characters.",
    "any.required": "Product title is required.",
    "string.empty": "Product title cannot be empty.",
  }),
  price: Joi.number().max(999999).required().messages({
    "number.max": "Price must be less than ₹999999.",
    "any.required": "Price is required.",
    "number.base": "Price must be a number.",
    "number.empty": "Price cannot be empty.",
  }),
  mrp: Joi.number().max(999999).required().messages({
    "number.max": "MRP must be less than ₹999999.",
    "any.required": "MRP is required.",
    "number.base": "MRP must be a number.",
    "number.empty": "MRP cannot be empty.",
  }),
  stock: Joi.number().max(999999).required().messages({
    "number.max": "Stock quantity must be less than 999999 items.",
    "any.required": "Stock quantity is required.",
    "number.empty": "Stock quantity cannot be empty.",
  }),
});

export const createProductSchema = Joi.object({
  title: Joi.string().lowercase().min(5).max(80).required().messages({
    "string.min": "Product title be at least 3 characters long.",
    "string.max": "Product title be less than 80 characters.",
    "any.required": "Product title is required.",
    "string.empty": "Product title cannot be empty.",
  }),
  shortDescription: Joi.string()
    .lowercase()
    .min(20)
    .max(300)
    .required()
    .messages({
      "string.min": "Short-description must be at least 20 characters long.",
      "string.max": "Short-description must be less than 200 characters.",
      "any.required": "Short-description is required.",
      "string.empty": "Short-description cannot be empty.",
    }),
  description: Joi.string().lowercase().min(50).max(1500).required().messages({
    "string.min": "Description must be at least 50 characters long.",
    "string.max": "Description must be less than 1500 characters.",
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
  category: Joi.string()
    .required()
    .external(async (value) => {
      const category = await Categories.findOne({ slug: value });
      if (!category) {
        throw new Joi.ValidationError("Category does not exists.", [
          {
            message: "Category does not exists.",
            path: ["category"],
            type: "any.valid",
            context: { label: "category", value: value },
          },
        ]);
      }
      return value;
    })
    .messages({
      "any.required": "Category is required.",
      "string.empty": "Category is required.",
    }),
  tags: Joi.array().max(50).messages({
    "string.max": "tags must be less than 50 characters.",
    "string.empty": "tags cannot be empty.",
  }),
  price: Joi.number().max(999999).required().messages({
    "number.max": "Price must be less than ₹999999.",
    "any.required": "Price is required.",
    "number.base": "Price must be a number.",
    "number.empty": "Price cannot be empty.",
  }),
  mrp: Joi.number().max(999999).required().messages({
    "number.max": "MRP must be less than ₹999999.",
    "any.required": "MRP is required.",
    "number.base": "MRP must be a number.",
    "number.empty": "MRP cannot be empty.",
  }),
  stock: Joi.number().max(999999).required().messages({
    "number.max": "Stock quantity must be less than 999999 items.",
    "any.required": "Stock quantity is required.",
    "number.empty": "Stock quantity cannot be empty.",
  }),
  variants: [variantItemSchema],
  attributes: attributeSchema,
})
  .external(async (value) => {
    // 1. Validate category exists
    const category = await Categories.findOne({ slug: value.category });
    if (!category) throw new Error("Invalid category.");

    // 2. Validate attributes match category definition
    if (value.variants?.length && category.attributes?.length) {
      for (const variant of value.variants) {
        for (const attr of category.attributes) {
          if (!(attr.name in variant)) {
            throw new Error(`Missing attribute: ${attr.name}`);
          }
          // validate option values for select type
          if (
            attr.inputType === "select" &&
            !attr.options.includes(variant[attr.name])
          ) {
            throw new Error(`Invalid option for ${attr.name}`);
          }
        }
      }
    }

    return value;
  })
  .unknown(false)
  .messages({
    "object.unknown": "Extra fields are not allowed.",
  });

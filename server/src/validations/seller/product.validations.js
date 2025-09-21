import Joi from "joi";
import Categories from "../../Models/category.js";

const variantItemSchema = Joi.array()
  .items(
    Joi.object({
      variantTitle: Joi.string()
        .lowercase()
        .min(5)
        .max(80)
        .required()
        .messages({
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
      attributes: Joi.array().items(Joi.object()),
    }).unknown(false)
  )
  .messages({
    "array.base": "Variants must be an array of objects.",
    "array.includes": "Each Variants must be a valid object.",
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
      const category = await Categories.findOne({ slug: value, level: 3 });
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
  variants: variantItemSchema,
  attributes: Joi.array().items(Joi.object()),
})
  .external(async (value) => {
    const category = await Categories.findOne({
      slug: value.category,
      level: 3,
    }).select("-_id attributes");

    const productAttributes = value.attributes || [];
    for (const att of category.attributes) {
      const productAtt = productAttributes.find(
        (pa) => pa?.name?.toLowerCase() === att.name.toLowerCase()
      );

      if (
        att.required === true ||
        (att.required === false && productAtt?.name)
      ) {
        if (!productAtt) {
          throw new Joi.ValidationError("Missing required attribute.", [
            {
              message: "Some Required attribute is missing.",
              path: ["attributes"],
              type: "any.required",
              context: { label: "attributes", value },
            },
          ]);
        }

        if (!productAtt.value || typeof productAtt.value !== "string") {
          throw new Joi.ValidationError(
            "Attribute value is required and must be a string.",
            [
              {
                message: `${productAtt.name} attribute's value is required.`,
                path: ["attributes"],
                type: "any.valid",
                context: { label: "attributes", value },
              },
            ]
          );
        }
      }

      if (productAtt && att.inputType === "select") {
        if (!att.options.includes(productAtt.value)) {
          throw new Joi.ValidationError("Invalid attribute value.", [
            {
              message: `${att.name} attribute's value must be one of the allowed options.`,
              path: ["attributes"],
              type: "any.valid",
              context: { label: "attributes", value },
            },
          ]);
        }
      }
    }
    if (value.variants?.length) {
      for (const variant of value.variants) {
        for (const att of category.attributes) {
          const varAtt = variant.attributes?.find(
            (va) => va?.name?.toLowerCase() === att.name.toLowerCase()
          );

          if (att.required || (att.required === false && varAtt?.name)) {
            if (!varAtt) {
              throw new Joi.ValidationError("Missing variant attribute.", [
                {
                  message: `Variant attribute ${att.name} is required.`,
                  path: ["variants"],
                  type: "any.required",
                  context: { label: "variants", value },
                },
              ]);
            }

            if (!varAtt.value || typeof varAtt.value !== "string") {
              throw new Joi.ValidationError(
                "Invalid variant attribute value.",
                [
                  {
                    message: `Variant attribute ${att.name} value is required and must be a string.`,
                    path: ["variants"],
                    type: "any.valid",
                    context: { label: "variants", value },
                  },
                ]
              );
            }
          }

          if (varAtt && att.inputType === "select") {
            if (!att.options.includes(varAtt.value)) {
              throw new Joi.ValidationError(
                "Invalid variant attribute option.",
                [
                  {
                    message: `Variant's ${att.name} attribute value must be one of the allowed options.`,
                    path: ["variants"],
                    type: "any.valid",
                    context: { label: "variants", value },
                  },
                ]
              );
            }
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

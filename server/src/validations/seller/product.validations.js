import Joi from "joi";
import Categories from "../../Models/category.js";
import Brand from "../../Models/brand.js";
import Product from "../../Models/product.js";

const variantItemSchema = Joi.array()
  .items(
    Joi.object({
      variantTitle: Joi.string()
        .lowercase()
        .min(5)
        .max(80)
        .required()
        .messages({
          "string.min": "Variant title must be at least 5 characters long.",
          "string.max": "Variant title must be less than 80 characters.",
          "any.required": "Variant title is required.",
          "string.empty": "Variant title cannot be empty.",
        }),

      price: Joi.number().min(0).max(999999).required().messages({
        "number.base": "Variant price must be a number.",
        "number.min": "Variant price cannot be negative.",
        "number.max": "Variant price must be less than ₹999999.",
        "any.required": "Variant price is required.",
      }),

      mrp: Joi.number().min(Joi.ref("price")).max(999999).required().messages({
        "number.base": "Variant MRP must be a number.",
        "number.min": "Variant MRP must be greater than or equal to price.",
        "number.max": "Variant MRP must be less than ₹999999.",
        "any.required": "Variant MRP is required.",
      }),

      stock: Joi.number().integer().min(0).max(999999).required().messages({
        "number.base": "Variant stock must be a number.",
        "number.integer": "Variant stock must be an integer.",
        "number.min": "Variant stock cannot be negative.",
        "number.max": "Variant stock must be less than 999999.",
        "any.required": "Variant stock is required.",
      }),

      attributes: Joi.object()
        .pattern(Joi.string(), Joi.string())
        .required()
        .messages({
          "object.base": "Variant attributes must be an object.",
          "any.required": "Variant attributes are required.",
        }),
    }).unknown(false),
  )
  .messages({
    "array.base": "Variants must be an array.",
  });

/* ---------------- PRODUCT SCHEMA ---------------- */

export const createProductBasicSchema = Joi.object({
  title: Joi.string().lowercase().min(5).max(80).required().messages({
    "string.min": "Product title must be at least 5 characters long.",
    "string.max": "Product title must be less than 80 characters.",
    "any.required": "Product title is required.",
    "string.empty": "Product title cannot be empty.",
  }),

  brand: Joi.string()
    .required()
    .external(async (value) => {
      const brand = await Brand.findOne({ slug: value });
      if (!brand) {
        throw new Joi.ValidationError("Invalid category.", [
          { message: "Selected Brand does not exist.", path: ["brand"] },
        ]);
      }
      return brand._id;
    })
    .messages({
      "any.required": "Brand is required.",
      "string.empty": "Brand is required.",
    }),

  shortDescription: Joi.string().min(20).max(300).required().messages({
    "string.min": "Short description must be at least 20 characters long.",
    "string.max": "Short description must be less than 300 characters.",
    "any.required": "Short description is required.",
  }),

  description: Joi.string().min(50).max(1500).required().messages({
    "string.min": "Description must be at least 50 characters long.",
    "string.max": "Description must be less than 1500 characters.",
    "any.required": "Description is required.",
  }),

  categories: Joi.array()
    .required()
    .items(Joi.string())
    .external(async (values) => {
      // array of ids
      const category = await Categories.find({
        _id: { $in: values },
      })
        .select("_id")
        .lean();
      if (category.length !== values?.length) {
        throw new Joi.ValidationError("Invalid categories exists.", [
          {
            message: "Selected category does not exist.",
            path: ["category"],
          },
        ]);
      }
      return values;
    })
    .messages({
      "any.required": "Categories is required.",
    }),

  tags: Joi.array().items(Joi.string()).max(50).messages({
    "array.max": "You can add up to 50 tags only.",
  }),

  base_price: Joi.number().min(0).max(999999).required().messages({
    "number.base": "Base price must be a number.",
    "number.min": "Base price cannot be negative.",
    "number.max": "Base price must be less than ₹999999.",
    "any.required": "Base price is required.",
  }),

  base_mrp: Joi.number()
    .min(Joi.ref("base_price"))
    .max(999999)
    .required()
    .messages({
      "number.base": "Base MRP must be a number.",
      "number.min": "Base MRP must be greater than or equal to price.",
      "number.max": "Base MRP must be less than ₹999999.",
      "any.required": "Base MRP is required.",
    }),
  stock: Joi.number().min(0).max(999999).required().messages({
    "number.base": "Stock quantity must be a number.",
    "number.min": "Stock quantity must be greater than or equal to zero.",
    "number.max": "Stock quantity must be less than 999999.",
    "any.required": "Stock quantity is required.",
  }),
})
  .unknown(false)
  .messages({ "object.unknown": "Extra fields are not allowed." });

export const createProductAttributesSchema = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required.",
    "string.empty": "Product ID cannot be empty.",
  }),
  attributes: Joi.object()
    .pattern(Joi.string(), Joi.string())
    .required()
    .messages({
      "object.base": "Attributes must be an object.",
      "any.required": "Attributes are required.",
    }),
}).external(async (value) => {
  const product = await Product.findById(value.productId).lean();
  if (!product) {
    throw new Joi.ValidationError("Invalid product", [
      { message: "Product not found", path: ["productId"] },
    ]);
  }

  const category = await Categories.findById(product.category)
    .select("attributes")
    .lean();

  if (!category) return value;

  const productAttributes = value.attributes;

  for (const att of category.attributes || []) {
    const attrValue = productAttributes[att.name];

    // REQUIRED CHECK
    if (att.required && (attrValue === undefined || attrValue === null)) {
      throw new Joi.ValidationError("Missing product attribute", [
        {
          message: `${att.name} is required`,
          path: ["attributes", att.name],
        },
      ]);
    }

    // SELECT OPTION CHECK
    if (att.inputType === "select" && attrValue != null) {
      if (!att.options.includes(attrValue)) {
        throw new Joi.ValidationError("Invalid product attribute option", [
          {
            message: `${att.name} must be one of ${att.options.join(", ")}`,
            path: ["attributes", att.name],
          },
        ]);
      }
    }
  }

  return value;
});

export const updateProductStatusSchema = Joi.object({
  status: Joi.string()
    .valid("draft", "active", "inactive")
    .required()
    .messages({
      "any.only": "Product status can either be draft, active or inactive.",
      "any.required": "Product status is required.",
    }),
});

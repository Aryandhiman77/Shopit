import mongoose from "mongoose";
import category from "./category";
import { slugify } from "slugify";

// Variant Schema (for size, color, etc.)
const variantSchema = new mongoose.Schema(
  {
    variantTitle: { type: String, required: true, trim: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    sku: { type: String, required: true, unique: true },
    attributes: mongoose.Schema.Types.Mixed,
    price: { type: Number, required: true },
    mrp: { type: Number },
    stock: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
    images: {
      type: [String],
      validate: [(arr) => arr.length <= 10, "Maximum 10 images allowed"],
    },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    shortDescription: { type: String, maxlength: 200 },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    tags: [{ type: String }],

    // For simple products (without variants)
    price: { type: Number, index: true },
    mrp: { type: Number },
    stock: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
    images: {
      type: [String],
      validate: [(arr) => arr.length <= 10, "Maximum 10 images allowed"],
    },

    // Variants
    variants: {
      type: [variantSchema],
      validate: [(arr) => arr.length <= 50, "Too many variants"],
    },

    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: ["draft", "active", "inactive"],
      default: "active",
    },
    attributes: mongoose.Schema.Types.Mixed,
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);
productSchema.index({
  category: 1,
  price: 1,
  slug: 1,
  isFeatured: 1,
  isTrending: 1,
  tags: 1,
  isActive: 1,
});

productSchema.pre("save", async function (next) {
  if (
    !this.isModified("name") &&
    !this.isModified("variants") &&
    !this.isModified("category")
  ) {
    return next();
  }

  const category = await mongoose.models.Category.findById(this.category);
  if (!category) {
    return next(new Error("Category not found"));
  }

  let categoryCode = category.name
    .replace(/-/g, "") // remove existing hyphens
    .replace(/\s+/g, "-") // spaces -> hyphen
    .toUpperCase();

  // ---------- SLUG ----------
  let baseSlug = slugify(`${category.slug}-${this.name}`, {
    lower: true,
    strict: true,
  });
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Ensure product slug is unique
  while (
    await mongoose.models.Product.findOne({
      slug: uniqueSlug,
      _id: { $ne: this._id },
    })
  ) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }
  this.slug = uniqueSlug;

  // ---------- SKU ----------
  let baseSku = `${categoryCode}-${this.name
    .replace(/-/g, "") // remove hyphens
    .replace(/\s+/g, "-") // spaces -> hyphen
    .toUpperCase()}`;

  this.sku = baseSku;

  // ---------- VARIANTS ----------
  if (this.variants && this.isModified("variants")) {
    this.variants = this.variants.map((variant, index) => {
      let variantSlug = `${uniqueSlug}-${slugify(
        variant.option || `variant-${index + 1}`,
        { lower: true, strict: true }
      )}`;

      let optionSku = (variant.option || `VARIANT${index + 1}`)
        .replace(/-/g, "")
        .replace(/\s+/g, "-")
        .toUpperCase();

      return {
        ...variant,
        slug: variantSlug,
        sku: `${baseSku}-${optionSku}`,
      };
    });
  }
  next();
});

export default mongoose.model("Product", productSchema);

[
  {
    variantTitle: "red black",
    price: 3000,
    mrp: 3000,
    stock: 200,
    attributes: [
      {
        name: "",

      },
    ],
  },
];

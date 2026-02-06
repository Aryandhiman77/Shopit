import mongoose from "mongoose";
import category from "./category.js";
import slugify from "slugify";

// Variant Schema (for size, color, etc.)
const variantSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index:true
    },
    sku: { type: String, required: true ,unique:true},
    attributes: {
      type: Map,
      of: String, // { color: "Red", size: "M" }
    },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    thumbnail: {
      url: String,
      public_id: String,
    },
    isActive: { type: Boolean, default: true },
    gallery: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      validate: {
        validator: function (arr) {
          return arr.length <= 10; // max 10 images
        },
        message: "Maximum 10 images allowed",
      },
    },
  },
  { _id: true },
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },
    sku: { type: String, unique: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    shortDescription: { type: String, maxlength: 300 },
    description: { type: String },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    tags: [{ type: String, index: true }],

    //Base prices when no variants
    price: { type: Number, index: true },
    mrp: { type: Number },
    stock: { type: Number, default: 0 },
    // base thumbnail and gallery optional
    thumbnail: {
      url: { type: String },
      public_id: { type: String },
    },
    gallery: {
      type: [{ _id: false, url: String, public_id: String }],
      validate: {
        validator: function (arr) {
          return arr.length <= 10; // max 10 images
        },
        message: "Maximum 10 images allowed",
      },
    },

    // Variants
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variants",
      },
    ],

    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false }, // set by admin

    status: {
      type: String,
      enum: ["draft", "active", "inactive"],
      default: "draft",
      index: true,
    },
    attributes: {
      type: Map,
      of: String, // { material: "Steel", dishwasherSafe: "Yes" }
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true },
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
  if (!this.isModified("title") && !this.isModified("category")) {
    return next();
  }

  const category = await mongoose.models.Category.findById(this.category);
  if (!category) return next(new Error("Category not found"));

  // PRODUCT SLUG
  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (
    await mongoose.models.Product.findOne({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;

  // PRODUCT SKU
  const categoryCode = category.slug.toUpperCase().slice(0, 4);
  this.sku = `${categoryCode}-${Date.now()}`;

  // VARIANTS
  if (this.variants?.length) {
    this.hasVariants = true;

    this.variants = this.variants.map((v, i) => ({
      ...v,
      slug: `${slug}-${slugify(v.title, { lower: true })}`,
      sku: `${this.sku}-V${i + 1}`,
    }));
  } else {
    this.hasVariants = false;
  }

  next();
});

export default mongoose.model("Product", productSchema);

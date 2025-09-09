import mongoose from "mongoose";
import category from "./category";

// Variant Schema (for size, color, etc.)
const variantSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    attributes: {
      type: Map,
      of: String,
    },
    price: { type: Number, required: true },
    mrp: { type: Number },
    stock: { type: Number, default: 0 },
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

// Auto-generate slug
productSchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  let baseSlug = slugify(this.name, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Ensure slug is unique
  while (await mongoose.models.Product.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  this.slug = uniqueSlug;
  next();
});

export default mongoose.model("Product", productSchema);

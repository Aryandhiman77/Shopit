import mongoose from "mongoose";
import slugify from "slugify";

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  attributes: { type: Map, of: String },
  price: { type: Number, required: true, min: 0 },
  mrp: { type: Number },
  stock: { type: Number, default: 0 },
  images: [String],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    tags: [String],
    thumbnail: String,

    // For simple products
    price: { type: Number, min: 0 },
    mrp: { type: Number },
    stock: { type: Number },

    // For complex products
    variants: [variantSchema],
  },
  { timestamps: true }
);

// For Full-text search
productSchema.index({ name: "text", description: "text", tags: "text" });

// Auto slug
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Ensure MRP >= Price
productSchema.pre("save", function (next) {
  if (this.price && this.mrp && this.price > this.mrp) {
    return next(new Error("Price cannot be greater than MRP"));
  }
  next();
});

export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true },
    logo: { url: String, public_id: String },
    description: { type: String },

    isActive: {
      type: Boolean,
      default: true,
    },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isVerified: { type: Boolean, default: false }, // seller can make payment and get verified tick.

    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

// Auto-generate slug
brandSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

export default mongoose.model("Brand", brandSchema);

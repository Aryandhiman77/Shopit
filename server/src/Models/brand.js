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
    isVerified: { type: Boolean, default: false },

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

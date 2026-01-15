import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, index: true },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // default for level-1 category
    },
    level: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    isLeaf: {
      type: Boolean,
      default: false,
    },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    attributes: [
      {
        name: { type: String, required: true },
        inputType: {
          type: String,
          enum: ["string", "number", "boolean", "select"],
          default: "string",
        },
        options: [String], // for dropdown
        required: { type: Boolean, default: false }, // is required or not
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate slug
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

export default mongoose.model("Category", categorySchema);

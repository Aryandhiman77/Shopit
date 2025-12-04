import mongoose from "mongoose";
import slugify from "slugify";

const documentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["trademark", "gst", "pan", "authorization_letter", "certificate"],
      required: true,
    },
    url: { type: String, required: true },
    public_id: String, // if uploading to Cloudinary
    verified: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { _id: false, timestamps: true }
);
const BrandRequestSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      default: null, // set after brand approved by admin
    },
    logo: {
      public_id: String,
      url: String,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documents: {
      type: [documentSchema],
      validate: [
        {
          validator: function (arr) {
            const uniqueTypes = new Set(arr.map((d) => d.type));
            return uniqueTypes.size === arr.length; // prevent duplicates
          },
          message: "Duplicate documents is not allowed",
        },
      ],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNotes: String,
  },
  { timestamps: true }
);

const BrandRequest = mongoose.model("BrandRequest", BrandRequestSchema);
export default BrandRequest;

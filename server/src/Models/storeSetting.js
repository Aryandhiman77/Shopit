import mongoose from "mongoose";

const storeSettingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "My Store" },
    currency: { type: String, default: "INR" },
    taxRate: { type: Number, default: 0 },
    logo: String,
    supportEmail: String,
  },
  { timestamps: true }
);

//  Prevent multiple store settings docs
storeSettingsSchema.pre("save", async function (next) {
  const existing = await mongoose.models.StoreSettings.findOne();
  if (existing && !this._id.equals(existing._id)) {
    return next(new Error("Only one store settings document allowed"));
  }
  next();
});

export default mongoose.model("StoreSettings", storeSettingsSchema);

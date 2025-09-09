import mongoose from "mongoose";
import Product from "./product.js";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  variantSku: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, 
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentInfo: {
      method: String,
      transactionId: String,
      status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
  },
  { timestamps: true }
);

//  Index for faster queries
orderSchema.index({ user: 1, status: 1 });

//  Hook: reduce stock after order is placed
orderSchema.post("save", async function (doc, next) {
  if (doc.status === "paid") {
    for (const item of doc.items) {
      const product = await Product.findById(item.product);

      if (!product) continue;

      if (item.variantSku) {
        // Update variant stock
        const variant = product.variants.find(v => v.sku === item.variantSku);
        if (variant) {
          variant.stock = Math.max(0, variant.stock - item.quantity);
        }
      } else {
        // Update simple product stock
        product.stock = Math.max(0, product.stock - item.quantity);
      }

      await product.save();
    }
  }
  next();
});

export default mongoose.model("Order", orderSchema);

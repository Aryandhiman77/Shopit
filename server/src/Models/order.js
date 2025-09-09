import mongoose from "mongoose";
import Product from "./product.js";
const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 14); 

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trackingNumber: { type: String, unique: true },
  status: {
    type: String,
    enum: [
      "pending", 
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
      "returned",
    ],
    default: "pending",
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    orderNumber: { type: String, unique: true,default:()=>`ORD-${nanoid()}`},
    totalAmount: { type: Number, required: true },
    paymentInfo: {
      method: String,
      transactionId: String,
      status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
      },
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    placedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//  Index for faster queries
orderSchema.index({ user: 1, status: 1,orderNumber:1 });

//  Hook: reduce stock after order is placed
orderSchema.post("save", async function (doc, next) {
  if (doc.status === "paid") {
    for (const item of doc.items) {
      const product = await Product.findById(item.product);

      if (!product) continue;

      if (item.variantSku) {
        // Update variant stock
        const variant = product.variants.find((v) => v.sku === item.variantSku);
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

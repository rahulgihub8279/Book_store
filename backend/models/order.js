import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out for delivery", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("order", orderSchema);

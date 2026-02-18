import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  },
  { timestamps: true },
);

export default mongoose.model("user", userSchema);

import express from "express";
const router = express.Router();
import User from "../models/user.js";
import Book from "../models/book.js";
import Order from "../models/order.js";
import authenticateToken from "./userAuth.js";

//* place order
router.post("/placeorder", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({
        user: id,
        book: orderData._id,
      });
      const orderDataFromDb = await newOrder.save();
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
      await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
    }
    return res.status(200).json({
      message: "order place successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server error");
  }
});

//* get order history
router.get("/getorderhistory", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = userData.orders.reverse();
    return res.status(200).json({
      data: orderData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server error");
  }
});

//* get all orders - admin
router.get("/getallorders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      data: userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server error");
  }
});

//* update status
router.put("/updatestatus/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    await Order.findByIdAndUpdate(id, { status });

    return res.status(200).json({
      message: "Status updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;

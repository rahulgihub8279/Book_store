import express from "express";
const router = express.Router();
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";

//* add to cart - user
router.put("/addtocart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isCart = userData.cart.includes(bookid);
    if (isCart) {
      return res.status(200).json({
        message: "book is already in cart",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "book added to cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

//* remove from cart - user
router.put("/removefromcart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookid } = req.params;
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    return res.status(200).json({ message: "book deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

//* get cart of a user - user
router.get("/getcart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const userCart = userData.cart.reverse();
    return res.json({
      data: userCart,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

export default router;

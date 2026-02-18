import express from "express";
const router = express.Router();
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "./userAuth.js";

//* sign up
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    if (username.length <= 4) {
      return res
        .status(400)
        .json({ message: "usename should be greater than 4" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "usename already exist" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already exist" });
    }
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password should be greater than 5" });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPass, address });
    await newUser.save();
    return res.status(200).json({ message: "sign-up successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//* sign in
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "invalid credentials !" });
    }
    bcrypt.compare(password, existingUser.password, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "something went wrong !" });
      }
      if (!data) {
        return res.status(400).json({ message: "Invalid credentials !" });
      }
      if (data) {
        const authclaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authclaims }, "bookstore", {
          expiresIn: "30d",
        });
        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token,
          message: "login successfully",
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//* user info
router.get("/getuserinfo", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error !" });
  }
});

//* update address
router.put("/updateaddress", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address });
    res.status(200).json({ message: "Address updated sucessfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error !" });
  }
});

export default router;

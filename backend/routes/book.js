import express from "express";
import User from "../models/user.js";
import Book from "../models/book.js";
const router = express.Router(); 
import authenticateToken from "./userAuth.js";

//* add book - admin
router.post("/addbook", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({ message: "Only for admin !" });
    }
    const { url, title, author, price, desc, language } = req.body;
    const newbook = new Book({
      url,
      title,
      author,
      price,
      desc,
      language,
    });
    await newbook.save();
    res.status(200).json({ message: "book added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//* update book - admin
router.put("/updatebook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    const { url, title, author, price, desc, language } = req.body;

    await Book.findByIdAndUpdate(bookid, {
      url,
      title,
      author,
      price,
      desc,
      language,
    });
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

//* delete book - admin
router.delete("/deletebook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

//* get all books
router.get("/getallbooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

//* get recent books
router.get("/getrecentbooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

//* get book by /:id
router.get("/getbookbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(200).json({
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

export default router;

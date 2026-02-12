import express from "express";
const router = express.Router();
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";

//* add book to favourite - user
router.put("/addbooktofavoutite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFav = userData.favourites.includes(bookid);
    if (isBookFav) {
      return res.status(200).json({ message: "Book already exist !" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added favourites" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

//* delete book from favourite - user
router.put("/removebookfavourite", authenticateToken, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await User.findById(id);
    const isBookFav = userData.favourites.includes(bookid);
    if (isBookFav) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    }
    return res.status(200).json({ message: "Book removed from favourites" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

//* get favourites book of perticuler user - user
router.get("/getallfavouritesbooks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.status(200).json({
      data: favouriteBooks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error !" });
  }
});

export default router;

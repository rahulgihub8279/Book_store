import express from "express";
const router = express.Router();
import User from "../models/user.js";
import Book from "../models/book.js";
import order from "../models/order.js";
import authenticateToken from "./userAuth.js";
 
//* place order
router.post("/placeorder",authenticateToken,(req,res)=>{
    
})

export default router;

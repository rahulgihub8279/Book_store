import express from "express"
const router=express.Router();

//* sign up
router.post("/sign-up", async (req, res)=>{
    try{
  
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}) 
export default router;
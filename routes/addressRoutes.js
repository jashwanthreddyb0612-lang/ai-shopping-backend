const express=require("express");
const router=express.Router();
const{addAddress,viewAddress,updateAddress,removeAddress}=require("../controllers/addressControllers");
const authMiddleware=require("../middleware/authMiddleware");
router.post("/addaddress",authMiddleware,addAddress);
router.get("/viewaddress",authMiddleware,viewAddress);
router.put("/updateaddress",authMiddleware,updateAddress);
router.delete("/removeaddress/:id",authMiddleware,removeAddress);
module.exports=router;
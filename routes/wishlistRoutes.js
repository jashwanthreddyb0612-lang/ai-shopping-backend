const express=require("express");
const router=express.Router();
const {AddToWishList,viewWishList,removeWishlistProduct}=require("../controllers/wishlistControllers");
const authMiddleware=require("../middleware/authMiddleware");
router.post("/addproduct/:productID",authMiddleware,AddToWishList);
router.get("/viewproducts",authMiddleware,viewWishList);
router.delete("/removeproduct/:productID",authMiddleware,removeWishlistProduct);
module.exports=router;
const express=require("express");
const router=express.Router();
const middleware=require("../middleware/authMiddleware");
const {adminMiddleware}=require("../middleware/adminMiddleware");
const {registerUser,loginUser,getUsers,blockUser,unBlockUser}=require("../controllers/userControllers");
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/viewusers",middleware,adminMiddleware,getUsers);
router.post("/blockuser/:id",middleware,adminMiddleware,blockUser);
router.post("/unblockuser/:id",middleware,adminMiddleware,unBlockUser);

module.exports=router;
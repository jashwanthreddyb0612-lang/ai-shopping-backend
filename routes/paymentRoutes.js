const express=require("express");
const router=express.Router();
const {addPayment,updatePaymentStatus}=require("../controllers/paymentControllers");
const authMiddleware=require("../middleware/authMiddleware");
router.post("/addpayment",authMiddleware,addPayment);
router.put("/updatestatus/:orderID",authMiddleware,updatePaymentStatus);
module.exports=router;
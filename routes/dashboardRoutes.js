const express=require("express");
const router=express.Router();
const {adminDashboard,latestOrders,bestCustomer,updateOrderStatus}=require("../controllers/dashboardControllers");
const middleware=require("../middleware/authMiddleware");
const {adminMiddleware}=require("../middleware/adminMiddleware");
router.get("/admindashboard",middleware,adminMiddleware,adminDashboard);
router.get("/latestorders",middleware,adminMiddleware,latestOrders);
router.get("/bestcustomer",middleware,adminMiddleware,bestCustomer);
router.post("/updatestatus",middleware,adminMiddleware,updateOrderStatus);

module.exports=router;
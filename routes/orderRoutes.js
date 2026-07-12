const express=require("express");
const router=express.Router();
const middleware=require("../middleware/authMiddleware");
const {adminMiddleware}=require("../middleware/adminMiddleware");
const {createOrderWithItems,viewOrders,viewOrderDetails,cancelOrder}=require("../controllers/orderControllers");
router.post("/createorder",middleware,createOrderWithItems);

router.get("/vieworders",middleware,viewOrders);
router.get("/vieworderdetails/:id",middleware,viewOrderDetails);
router.put("/cancelorder/:id",middleware,cancelOrder);


module.exports=router;
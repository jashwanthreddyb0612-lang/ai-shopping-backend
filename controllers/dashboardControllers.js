const {admindashboard,latestorders,bestcustomer,updateorderstatus}=require("../models/dashboardModel");
const adminDashboard=async(req,res)=>{
	try{
		const dashboard=await admindashboard();
		res.json(dashboard);
	}catch(error){
		res.json(error.message);
	}
};
const latestOrders=async(req,res)=>{
	try{
		const orders=await latestorders();
		res.json(orders);
	}catch(error){
		res.json(error.message);
	}
};
const bestCustomer=async(req,res)=>{
	try{
		const customer=await bestcustomer();
		res.json(customer);
	}catch(error){
		res.json(error.message);
	}
};
const updateOrderStatus=async(req,res)=>{
	try{
		const {status,orderID}=req.body;
		const orderstatus=await updateorderstatus({status,orderID});
		res.json(orderstatus);
	}catch(error){
		res.json(error.message);
	}
};



module.exports={adminDashboard,latestOrders,bestCustomer,updateOrderStatus};
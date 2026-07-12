const {addpayment,updatepaymentstatus}=require("../models/paymentModel");
const addPayment=async(req,res)=>{
	try{
	const {orderID,amount,status}=req.body;
	const payment=await addpayment({orderID,amount,status});
	res.json(payment);
}catch(error){
	res.json(error.message);
}
};
const updatePaymentStatus=async(req,res)=>{
	try{
		const {orderID}=req.params;
		const {status}=req.body;
		const payment=await updatepaymentstatus({status,orderID});
		res.json(payment);
	}catch(error){
		res.json(error.message);
	}
};



module.exports={addPayment,updatePaymentStatus};
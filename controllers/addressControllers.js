const {addaddress,viewaddress,updateaddress,removeaddress}=require("../models/addressModel");
const addAddress=async(req,res)=>{
	try{
	const {id}=req.user;
	const{street,city,state,pincode}=req.body;
	const address=await addaddress({id,street,city,state,pincode});
	res.json(address);
}catch(error){
	res.json(error.message);
}
};
const viewAddress=async(req,res)=>{
	try{
	const {id}=req.user;
	
	const address=await viewaddress({id});
	
	res.json(address);
}catch(error){
	res.json(error.message);
}
};
const updateAddress=async(req,res)=>{
	try{
	const {id}=req.user;
	const {street,city,state,pincode}=req.body;
	const address=await updateaddress({id,street,city,state,pincode});
	res.json(address);
}catch(error){
	res.json(error.message);
}
};
const removeAddress=async(req,res)=>{
	try{
		const {id}=req.params;
		const address=await removeaddress({id});
		res.json(address);
	}catch(error){
	res.json(error.message);
}
}

module.exports={addAddress,viewAddress,updateAddress,removeAddress};
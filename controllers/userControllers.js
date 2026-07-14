const {registeruser,loginuser,getusers,blockuser,unblockuser,removeuser}=require("../models/userModel");
const {createcart,getcartbyuserid}=require("../models/cartModel");

const jwt=require("jsonwebtoken");
const registerUser=async(req,res)=>{
	try{
		const user=await registeruser(req.body);
		           await createcart(user.id);
		res.status(201).json({message:"user registered succsessfull",user});
	}catch(error){
		res.status(500).json(error.message);
	}
};
const loginUser=async(req,res)=>{
	try{
		const {email,password}=req.body;
		const user=await loginuser(email);
			if(!user){
			return res.status(404).json({message:"user not found"});
		}
		if(password!==user.password){
		return	res.status(401).json({message:"password not matched"});
		}
			if(user.is_blocked===true){
			return res.json("Account is blocked");
		}

		const token=jwt.sign(
		{
			id:user.id,
			role:user.role
		},
		process.env.JWT_SECRETKEY,
		{
			expiresIn:"1d"
		}
		);
		res.status(200).json({
			message:"login sucessfull",
			token
		});
	}catch(error){
			res.status(500).json(error.message);
	}
	
};
const getUsers=async(req,res)=>{
	try{
		const users=await getusers();
		res.json(users);
	}catch(error){
		res.json(error.message);
	}
};
const blockUser=async(req,res)=>{
	try{
		const {id}=req.params;
		const user=await blockuser({id});
		res.json(user);
	}catch(error){
		res.json(error.message);

	}
};
const unBlockUser=async(req,res)=>{
	try{
		const {id}=req.params;
		const user=await unblockuser({id});
		res.json(user);
	}catch(error){
		res.json(error.message);
	}
};
const removeUser=async(req,res)=>{
	try{
		const userID=req.params.id;
		const user=await removeuser(userID);
		res.json(user);

	}catch(error){
		res.json(error.message);
	}
};

	
module.exports={registerUser,loginUser,getUsers,blockUser,unBlockUser,removeUser};
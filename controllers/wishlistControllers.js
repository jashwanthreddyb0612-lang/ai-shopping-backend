const {addtowishlist,viewwishlist,removewishlistproduct}=require("../models/wishlistModel");
const AddToWishList=async(req,res)=>{
	try{
	const {id}=req.user;

	const {productID}=req.params;
	
	
	const wishlist=await addtowishlist({productID,id});
	res.json(wishlist);
}catch(error){
	res.json(error.message);
}
};
const viewWishList=async(req,res)=>{
	try{
		const {id}=req.user;
		const wishlist=await viewwishlist({id});
		res.json(wishlist);
	}catch(error){
		res.json(error.message);
	}
};

const removeWishlistProduct=async(req,res)=>{
	try{
		const {id}=req.user;
		const {productID}=req.params;
				const wishlist=await removewishlistproduct({id,productID});
				console.log(wishlist);
		res.json(wishlist);

	}catch(error){
		res.json(error.message);
	}
};



module.exports={AddToWishList,viewWishList,removeWishlistProduct};
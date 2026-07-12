const {addtocart,getmycart,viewcartitems,removefromcart,increasequantity,decreasequantity}=require("../models/cartModel");
const AddToCart=async(req,res)=>{
	try{
		const userID=req.user.id;
		const cart=await getmycart(userID);
		console.log(cart);
		const cartID=cart.id;
		console.log(cartID);
		const{productID}=req.params.productID;
		const{quantity}=req.body;

	const cart_items=await addtocart({productID,quantity,cartID});
	res.status(200).json(cart_items);
}catch(error){
	res.status(401).json(error.message);
}
};
const viewCartItems=async(req,res)=>{
	try{

	const userID=req.user.id;
	const cart=await getmycart(userID);
	const cartID=cart.id;

	const items=await viewcartitems(cartID);
	
	res.status(200).json(items);
}catch(error){
	res.status(500).json(error.message);
}
};

const removeFromCart=async(req,res)=>{
	try{
		const product_id=req.params.id;

		const cart=await removefromcart(product_id);
		res.status(200).json({
			message:"Item removed from cart sucessfully",
			
			cart
		});

	}catch(error){
		res.status(401).json(error.message);
	}
};
const increaseQuantity=async(req,res)=>{
	try{
		const productID=req.params.id;
		const quantity=await increasequantity(productID);
         res.json(quantity);
			}catch(error){
				res.json(error.message);
			}
};
const decreaseQuantity=async(req,res)=>{
	try{
		const productID=req.params.id;
		const quantity=await decreasequantity(productID);
		res.json(quantity);
	}catch(error){
		res.json(error.message);
	}
};



module.exports={AddToCart,viewCartItems,removeFromCart,increaseQuantity,decreaseQuantity};
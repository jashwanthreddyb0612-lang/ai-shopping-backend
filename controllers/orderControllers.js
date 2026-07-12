const {createorder,additemtoorder,vieworders,vieworderdetails,cancelorder,reducestock}=require("../models/orderModel");
const {getproductsbyid}=require("../models/productModel");
const {getmycart,viewcartitems}=require("../models/cartModel");
const pool=require("../config/db");
const createOrderWithItems=async(req,res)=>{
	const client=await pool.connect();
	try{
		const userID=req.user.id;
		const cart=await getmycart(userID);
		const cartID=cart.id;
		const cartItems=await viewcartitems(cartID);
		let total_amount=0;
		for(const item of cartItems){
			total_amount +=item.price*item.quantity;
		}
	
		await client.query("BEGIN");
		const order=await createorder({
			userID,
			total_amount,
			status:"pending"
		},client);

		for(const item of cartItems){

			const product=await getproductsbyid({productID:item.product_id});
			if(item.quantity>product.stock){
				return res.json({
					message:"Out of stock ",
				});
			}

		          await additemtoorder({
		          	orderID:order.id,
		          	productID:item.product_id,
		          	quantity:item.quantity,
		          	price:parseInt(item.price)
		          },client);

		      await reducestock({
		      	productID:item.product_id,
		      	quantity:item.quantity
		      },client);

     }
     await client.query("COMMIT");
     res.status(201).json({
     	message:"Order created successfully",
     	order
     });

	}catch(error){
		await client.query("ROLLBACK");
		res.status(500).json({message:error.message});

	}finally{
		client.release();
	}
};


const viewOrders=async(req,res)=>{
	try{
		const user_id=req.user.id;
		const orders=await vieworders({user_id});
		res.status(200).json(orders);
	}catch(error){
		res.status(401).json(error.message);
	}
};
const viewOrderDetails=async(req,res)=>{
	try{
	const order_id=req.params.id;
	const order=await vieworderdetails({order_id});
	console.log(order);
	res.json(order);
}catch(error){
	res.json(error.message);
}
};
const cancelOrder=async(req,res)=>{
	try{
		const id=req.params.id;
		const order=await cancelorder(id);
		res.json(order);
	}catch(error){
		res.json(error.message);
	}
};




module.exports={createOrderWithItems,viewOrders,viewOrderDetails,cancelOrder};
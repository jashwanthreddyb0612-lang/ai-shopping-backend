const pool=require("../config/db");
const addtocart=async({productID,quantity,cartID})=>{
	const result=await pool.query(
       "INSERT INTO cart_items(product_id,quantity,cart_id) VALUES ($1,$2,$3) RETURNING*",[productID,quantity,cartID]
		);
	return result.rows;
};
const createcart=async(userID)=>{
const result=await pool.query(
    "INSERT INTO carts(user_id)VALUES($1) RETURNING*",[userID]
	);
return result.rows[0];

};
const getmycart=async(userID)=>{

	const result=await pool.query(
        "SELECT* FROM carts WHERE user_id=$1",[userID]
		);
	return result.rows[0];
};
const viewcartitems=async(cartID)=>{
	const result=await pool.query(
          "SELECT products.name,products.price,cart_items.quantity,cart_items.product_id,cart_items.id FROM products INNER JOIN cart_items ON cart_items.product_id=products.id WHERE cart_id=$1 ",[cartID]
		);
	return result.rows;
};
const removefromcart=async(product_id)=>{
	const result=await pool.query(
       "DELETE FROM cart_items WHERE product_id=$1 RETURNING*",[product_id]
		);
	return result.rows[0];
};
const increasequantity=async(productID)=>{
	const result=await pool.query(
     "UPDATE cart_items SET quantity=quantity+1 WHERE product_id=$1",[productID]
		);
	return result.rows[0];
};
const decreasequantity=async(productID)=>{
	const result=await pool.query(
   "UPDATE cart_items SET quantity=quantity-1 WHERE product_id=$1",[productID]
		);
	return result.rows[0];
};

module.exports={addtocart,createcart,getmycart,viewcartitems,removefromcart,increasequantity,decreasequantity};
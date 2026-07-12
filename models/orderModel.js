const pool=require("../config/db");
const createorder=async({userID,status,total_amount},client=pool)=>{
	const result= await client.query(
     "INSERT INTO orders(user_id,status,total_amount) VALUES($1,$2,$3) RETURNING*",[userID,status,total_amount]
		);
	return result.rows[0];
};
const additemtoorder=async({orderID,productID,quantity,price},client=pool)=>{
	const result=await client.query(
      "INSERT INTO order_items(product_id,quantity,price,order_id) VALUES($1,$2,$3,$4) RETURNING*",[productID,quantity,price,orderID]
		);

	return result.rows[0];
};
const reducestock=async({productID,quantity},client=pool)=>{
 	const result=await client.query(
    "UPDATE products SET stock=stock-$1 WHERE id=$2 RETURNING *",[quantity,productID]
 		);
 	return result.rows[0];
 };


const vieworders=async({user_id})=>{
	const result=await pool.query(
        "SELECT *  FROM orders WHERE user_id=$1",[user_id]
		);
	return result.rows;
};

const vieworderdetails=async({order_id})=>{
	const result=await pool.query(
      "SELECT products.name,order_items.quantity,order_items.price FROM products INNER JOIN order_items ON products.id=order_items.product_id WHERE order_items.order_id=$1",[order_id]
		);
	return result.rows;
};
const cancelorder=async(id)=>{
	const result=await pool.query(
        "UPDATE orders SET status='cancelled' WHERE id=$1 RETURNING*",[id]
		);
	return result.rows;
};


 


module.exports={createorder,additemtoorder,vieworders,vieworderdetails,cancelorder,reducestock};
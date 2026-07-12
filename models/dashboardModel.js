const pool=require("../config/db");
const admindashboard=async()=>{
	const users=await pool.query(
        "SELECT COUNT(*) AS Total_users FROM users"
		);
	const products=await pool.query(
       "SELECT COUNT(*) AS Total_products FROM products"
		);
	const orders=await pool.query(
      "SELECT COUNT(*) AS Total_orders FROM orders"
		);
	const revenue=await pool.query(
     "SELECT SUM(total_amount) AS Total_revenue FROM orders"
		);
	const highcostproduct=await pool.query(
     "SELECT MAX(price) AS Highcost_product FROM products"
		);
	const topsellingproduct=await pool.query(
    "SELECT products.name,SUM(quantity) AS Total_sold FROM order_items INNER JOIN products ON order_items.product_id=products.id GROUP BY(products.name) ORDER BY (Total_sold)DESC"
		);
	const getlowstockproducts=await pool.query(
   "SELECT * FROM products WHERE stock<2 ORDER BY(stock) asc"
		);
	return {
		users:users.rows[0],
		products:products.rows[0],
		orders:orders.rows[0],
		revenue:revenue.rows[0],
		highcostproduct:highcostproduct.rows[0],
		topsellingproduct:topsellingproduct.rows[0],
		getlowstockproducts:getlowstockproducts.rows
	};
};
const latestorders=async()=>{
	const result=await pool.query(
    "SELECT * FROM orders ORDER BY (id) DESC LIMIT 3"
		);
	return result.rows;
};
const bestcustomer=async()=>{
	const result=await pool.query(
   "SELECT users.name,SUM(orders.total_amount) AS Total_spent FROM orders INNER JOIN users ON orders.user_id=users.id GROUP BY(users.name) ORDER BY(Total_spent) DESC"
		);
	return result.rows;
};
const updateorderstatus=async({status,orderID})=>{
	const result=await pool.query(
    "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *",[status,orderID]
		);
	return result.rows[0];
};



module.exports={admindashboard,latestorders,bestcustomer,updateorderstatus};
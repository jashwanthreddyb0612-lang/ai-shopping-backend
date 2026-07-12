const pool=require("../config/db");
const addtowishlist=async({productID,id})=>{
	const result=await pool.query(
        "INSERT INTO wishlist(product_id,user_id) VALUES($1,$2) RETURNING*",[productID,id]
		);
	return result.rows;

};
const viewwishlist=async({id})=>{
	const result=await pool.query(
       "SELECT products.name,products.price,wishlist.id,wishlist.product_id FROM wishlist INNER JOIN products ON wishlist.product_id=products.id WHERE user_id=$1",[id]
		);
	return result.rows;
};
const removewishlistproduct=async({id,productID})=>{
	console.log(productID);
	console.log(id);
	const result=await pool.query(
     "DELETE FROM wishlist WHERE user_id=$1 AND product_id=$2 RETURNING *",[id,productID]
		);
	console.log(result.rows);

	return result.rows[0];
};




module.exports={addtowishlist,viewwishlist,removewishlistproduct};
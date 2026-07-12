const pool=require("../config/db");
const addpayment=async({orderID,status,amount})=>{
	const result=await pool.query(
     "INSERT INTO payments(order_id,status,amount) VALUES ($1,$2,$3) RETURNING *",[orderID,status,amount]
		);
	return result.rows;
};
const updatepaymentstatus=async({status,orderID})=>{
	const result=await pool.query(
       "UPDATE payments SET status=$1 WHERE order_id=$2 RETURNING *",[status,orderID] 
		);
	return result.rows;
}



module.exports={addpayment,updatepaymentstatus};
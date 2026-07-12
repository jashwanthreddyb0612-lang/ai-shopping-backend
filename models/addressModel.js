const pool=require("../config/db");
const addaddress=async({id,street,city,state,pincode})=>{
	const result=await pool.query(
     "INSERT INTO  addresses(user_id,street,city,state,pincode) VALUES($1,$2,$3,$4,$5) RETURNING *",[id,street,city,state,pincode]
		);
	return result.rows[0];

};
const viewaddress=async({id})=>{
	const result=await pool.query(
     "SELECT* FROM addresses WHERE user_id=$1",[id]
		);
	return result.rows;
};
const updateaddress=async({id,street,city,state,pincode})=>{
	const result=await pool.query(
   "UPDATE addresses SET street=$1,city=$2,state=$3,pincode=$4 WHERE user_id=$5 RETURNING *",[street,city,state,pincode,id]
		);
	return result.rows[0];
};
const removeaddress=async({id})=>{
	const result=await pool.query(
   "DELETE FROM addresses WHERE id=$1 RETURNING *",[id]
		);
	return result.rows[0];
}



module.exports={addaddress,viewaddress,updateaddress,removeaddress};
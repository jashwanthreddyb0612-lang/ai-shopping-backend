const pool=require("../config/db");
const registeruser=async({name,email,password,role})=>{
	
	const result=await pool.query(
          "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING*",[name,email,password,role]
		);
	return result.rows[0];
};

const loginuser=async(email)=>{
	const result=await pool.query(
      "SELECT * FROM users WHERE email=$1",[email]
		);
	return result.rows[0];

};
const getusers=async()=>{
	const result=await pool.query(
     "SELECT * FROM users"
		);
	return result.rows;

};
const blockuser=async({id})=>{
	const result=await pool.query(
   "UPDATE users SET is_blocked=true WHERE id=$1 RETURNING *",[id]
		);
	return result.rows[0];
   
};
const unblockuser=async({id})=>{
	const result=await pool.query(
   "UPDATE users SET is_blocked=false WHERE id=$1 RETURNING *",[id]   
		);
	return result.rows[0];
   };
const removeuser=async(userID)=>{
	const result=await pool.query(
    "DELETE FROM users WHERE user_id=$1",[userID]
		);
	return result.rows[0];
}


module.exports={registeruser,loginuser,getusers,blockuser,unblockuser,removeuser};
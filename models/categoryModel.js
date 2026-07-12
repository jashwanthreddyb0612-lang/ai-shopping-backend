const pool=require("../config/db");
const addcategory=async({name})=>{
	const result=await pool.query(
          "INSERT INTO categories(name)values($1) RETURNING*",[name]
		);
	return result.rows[0];
};
const getallcategories=async()=>{
	const result=await pool.query(
     "SELECT * FROM categories"
		);
	return result.rows;
};
const getcategorybyid=async(categoryID)=>{
	const result=await pool.query(
        "SELECT * FROM categories WHERE id=$1 ",[categoryID]
		);
	return result.rows[0];
};
const updatecategory=async({categoryID,name})=>{
	const result=await pool.query(
     "UPDATE categories SET name=$1 WHERE id=$2 RETURNING*",[name,categoryID]
		);
	return result.rows[0];
};
const removecategory=async(categoryID)=>{
	const result=await pool.query(
         "DELETE FROM categories WHERE id=$1 RETURNING*",[categoryID]
		);
	return result.rows[0];
};
module.exports={addcategory,getallcategories,getcategorybyid,updatecategory,removecategory};
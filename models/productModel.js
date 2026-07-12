const pool=require("../config/db");
const getallproducts=async()=>{
	const result=await pool.query(
    "SELECT * FROM products ORDER BY id ASC"
		);
	return result.rows;
};
const getproducts=async({limit,offset,sort,categoryID,search})=>{
const result=await pool.query(

    "SELECT * FROM products WHERE name ILIKE $1 AND category_id=$2 ORDER BY($3) ASC LIMIT $4 OFFSET $5",[`%${search}%`,categoryID,sort,limit,offset]
		);
	return result.rows;
};

const getproductsbyid=async({productID})=>{
	console.log(productID);
	
	const result=await pool.query(
            "SELECT*FROM products WHERE id=$1",[productID]
		);
return result.rows[0];
};

const addproduct=async({name,price,categoryID,description,stock})=>{
	
	const result=await pool.query(
              "INSERT INTO products(name,price,category_id,description,stock) VALUES($1,$2,$3,$4,$5) RETURNING*",[name,price,categoryID,description,stock]
		);
	return result.rows[0];
};

const updateproduct=async({productID,name,price,stock,description})=>{
	
	const result=await pool.query(
           "UPDATE products SET name=$1,price=$2,stock=$3,description=$4 WHERE id=$5 RETURNING*",[name,price,stock,description,productID]
		);
	return result.rows[0];

};

const removeproduct=async(productID)=>{
	
	const result=await pool.query(
           "DELETE FROM products WHERE id=$1 RETURNING*",[productID]
		);
	return result.rows[0];
};
const productwithcategory=async(req,res)=>{
	const result=await pool.query(
        "SELECT products.name AS products_name,categories.name AS category_name FROM products INNER JOIN categories ON products.category_id=categories.id "
		);
	return result.rows;

};
 
 const searchproducts=async(name)=>{
 	const result=await pool.query(
      "SELECT * FROM  products WHERE name ILIKE $1",[`%${name}%`]
 		);
 	return result.rows;
 };
 const getrelatedproducts=async(productID,categoryID)=>{
 	const result=await pool.query(
    "SELECT * FROM products WHERE category_id=$1 AND id!=$2",[categoryID,productID]
 		);
 	return result.rows;


 };
 const savetorecentlyviewed=async({productID,userID})=>{
 	const result=await pool.query(
     "INSERT INTO recently_viewed(product_id,user_id) VALUES($1,$2) RETURNING *",[productID,userID]
 		);
 	return result.rows;
 };
const recentlyviewedproducts=async(userID)=>{
    const result=await pool.query(
   "SELECT products.* FROM products INNER JOIN recently_viewed ON products.id=recently_viewed.product_id WHERE user_id=$1 ORDER BY(viewed_at) DESC LIMIT 5",[userID]
    	);
    return result.rows;
};
const savesearch=async({search,userID})=>{
	const result=await pool.query(
   "INSERT INTO search_history(search_term,user_id) VALUES($1,$2) RETURNING *",[search,userID]
		);
	return result.rows;

}
const searchhistory=async({userID})=>{
	const result=await pool.query(
   "SELECT * FROM search_history WHERE user_id=$1 ORDER BY(searched_at) DESC LIMIT 3",[userID]
		);
	return result.rows;
};
const deletehistory=async({userID,id})=>{
	const result=await pool.query(
   "DELETE FROM search_history WHERE user_id=$1 AND id=$2 RETURNING *",[userID,id]
		);
	return result.rows[0];
}


module.exports={getallproducts,getproducts,getproductsbyid,addproduct,updateproduct,removeproduct,productwithcategory,searchproducts,getrelatedproducts,savetorecentlyviewed,recentlyviewedproducts,savesearch,searchhistory,deletehistory};
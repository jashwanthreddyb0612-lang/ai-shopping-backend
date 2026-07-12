const pool=require("../config/db");
const getproductbyid=async({productID})=>{
	return await pool.query(
    "SELECT * FROM products WHERE id=$1",[productID]
		);
};
const getproductsbycategory=async({categoryID,productID})=>{
	return await pool.query(
   "SELECT * FROM products WHERE category_id=$1 AND id!=$2",[categoryID,productID]
		);
};
const getrecentlyviewedcount=async({productID})=>{
	return await pool.query(
   "SELECT COUNT(*) FROM recently_viewed WHERE product_id=$1",[productID]
		);
};
const getrecentlyviewedproducts=async({userID})=>{
	return await pool.query(
    "SELECT products.category_id,recently_viewed.product_id ,COUNT(*) AS view_count FROM products INNER JOIN recently_viewed ON products.id=recently_viewed.product_id WHERE recently_viewed.user_id=$1 GROUP BY recently_viewed.product_id,products.category_id",[userID]
		);
};
const getwishlistproducts=async({userID})=>{
	return await pool.query(
    "SELECT wishlist.product_id ,products.category_id,COUNT(*) AS wishlist_count FROM products INNER JOIN wishlist ON wishlist.product_id=products.id WHERE user_id=$1 GROUP BY(wishlist.product_id,products.category_id)",[userID]
		);
};
const getpurchasedproducts=async({userID})=>{
	return await pool.query(
   "SELECT order_items.product_id,products.category_id ,COUNT(*) AS purchase_count FROM orders INNER JOIN order_items ON order_items.order_id=orders.id INNER JOIN products ON order_items.product_id=products.id WHERE orders.user_id=$1 GROUP BY(order_items.product_id,products.category_id)",[userID]
		);
};
const getsearchhistory=async({userID})=>{
	return await pool.query(
   "SELECT products.category_id,COUNT(*) AS search_count FROM products INNER JOIN search_history ON LOWER(search_history.search_term)=LOWER(products.name) WHERE search_history.user_id=$1 GROUP BY products.category_id",[userID]
		);
};
const getfrequentlyboughttogether=async({productID})=>{
	return pool.query(
   "SELECT oi2.product_id,p.name,p.price,p.image, COUNT(*) as bought_count FROM order_items oi1 INNER JOIN order_items oi2 ON oi1.order_id=oi2.order_id INNER JOIN products p ON oi2.product_id=p.id WHERE oi1.product_id=$1 AND oi2.product_id!=$1 GROUP BY oi2.product_id,p.name,p.price,p.image ORDER BY bought_count DESC",[productID]
		);
};
const smartsearch=async({searchTerm})=>{
	return pool.query(
     "SELECT p.name,p.price,p.image FROM products p WHERE LOWER(name) LIKE LOWER($1)",[`%${searchTerm}%`]
		);
};
const savetosearchhistory=async({userID,searchTerm})=>{
	return pool.query(
   "INSERT INTO search_history(user_id,search_term) VALUES($1,$2)",[userID,searchTerm]
		);
};
const getallproducts=async()=>{
	return pool.query(
 "SELECT id,name,price,image,category_id FROM products"
		);
};
const chatassistant=async({category,minimumprice,maximumprice})=>{
	return pool.query(
    "SELECT id,name,price,image,description,category_id FROM products WHERE ($1::TEXT IS NULL OR LOWER(name) LIKE  LOWER('%' || $1 || '%'))  AND  ($2::NUMERIC IS NULL OR price>=$2) AND ($3::NUMERIC IS NULL OR price<=$3) ORDER BY price ASC",[category,minimumprice,maximumprice]
		);
};
module.exports={getproductbyid,getproductsbycategory,getrecentlyviewedcount,getrecentlyviewedproducts,getwishlistproducts,getpurchasedproducts,getsearchhistory,getfrequentlyboughttogether,smartsearch,savetosearchhistory,getallproducts,chatassistant};
const {getallproducts,getproducts,getproductsbyid,addproduct,updateproduct,removeproduct,productwithcategory,searchproducts,getrelatedproducts,savetorecentlyviewed,recentlyviewedproducts,savesearch,searchhistory,deletehistory}=require("../models/productModel");
const {successResponse,errorResponse}=require("../utils/response");
const errorMiddleware=require("../middleware/errorMiddleware");
const getAllProducts=async(req,res,next)=>{
	try{
		const products=await getallproducts();
			successResponse(res,"Products fetched successfully",products);
	}catch(error){
	next(error);
	}
};



const getProducts=async(req,res)=>{
	try{
		const userID=req.user.id;
   const page=parseInt(req.query.page)||1;
   const limit=parseInt(req.query.limit)||10;
   const offset=(page-1)*limit;


   const sort=req.query.sort||"desc";


   const categoryID=req.query.categoryID;


   const search=req.query.search||"";



	const products=await getproducts({limit,offset,sort,categoryID,search});
	if(search){
	               await savesearch({search,userID});
	            }
	res.status(200).json(products);
}catch(error){
	res.status(500).json(error.message);
}
};

const getProductsById=async(req,res)=>{
	try{
		const userID=req.user.id;

		const productID=Number(req.params.productID);
		const product=await getproductsbyid({productID});
		console.log(product);

		              await savetorecentlyviewed({productID,userID});
		res.status(200).json(product);
	}catch(error){
		res.status(404).json(error.message);
	}
};

const addProduct=async(req,res)=>{
	try{


		const product=await addproduct(req.body);
		res.status(200).json(product);
	}catch(error){
		res.status(400).json(error.message);
	}
};

const updateProduct=async(req,res)=>{
try{
	const {name,price,stock,description}=req.body;

	const productID=Number(req.params.id);
	const product=await updateproduct({price,name,productID,stock,description});
	res.json(product);

}catch(error){
	res.status(500).json(error.message);
}
};

const removeProduct=async(req,res)=>{
   try{
   	const productID=Number(req.params.id);
   	const product=await removeproduct(productID);
   	res.json(product);
   }catch(error){
   	res.status(500).json(error.message);

   }
};

const productWithCategory=async(req,res)=>{
	try{
	const category=await productwithcategory();
	res.status(201).json(category);
}catch(error){
	res.status(500).json(error.message);
}
};
const searchProducts=async(req,res)=>{
	try{
	const {name}=req.query;
	console.log("name:", name);
	const product=await searchproducts(name);
	res.status(200).json(product);
}catch(error){
	res.status(500).json(error.message);
}
};

const uploadImage=async(req,res)=>{
	res.json({
		message:"image uploaded",
	image:req.file.filename
	});
};
const getRelatedProducts=async(req,res)=>{
	const {productID}=req.params;
	console.log(productID);
	const product=await getproductsbyid(productID);
	console.log(product);
	const products=await getrelatedproducts(productID,product.category_id);
	res.json(products);

};
const recentlyViewedProducts=async(req,res)=>{
	const userID=req.user.id;

	const products=await recentlyviewedproducts(userID);
	res.json(products);
};
const searchHistory=async(req,res)=>{
	const userID=req.user.id;

	const searched=await searchhistory({userID});
	res.json(searched);
} ;
const deleteHistory=async(req,res)=>{
	const userID=req.user.id;
	const id=req.params.id;
	const deletedhistory=await deletehistory({userID,id});
	res.json(deletedhistory);
}



module.exports={getAllProducts,getProducts,getProductsById,addProduct,updateProduct,removeProduct,productWithCategory,searchProducts,uploadImage,getRelatedProducts,recentlyViewedProducts,searchHistory,deleteHistory};
const {addcategory,getallcategories,getcategorybyid,updatecategory,removecategory}=require("../models/categoryModel");
const addCategory=async(req,res)=>{
	try{
	const category=await addcategory(req.body);
	res.status(201).json(category);
}catch(error){
	res.status(500).json(error.message);
}
};

const getAllCategories=async(req,res)=>{
	try{
		const categories=await getallcategories();
		res.status(200).json(categories);
	}catch(error){
		res.status(500).json(error.message);
	}
};

const getCategoryById=async(req,res)=>{
	try{
		const categoryID=Number(req.params.id);
	const category=await getcategorybyid(categoryID);
	res.status(200).json(category);
}catch(error){
	res.status(404).json(error.message);
}
};
const updateCategory=async(req,res)=>{
	try{
		const {name}=req.body;
	const categoryID=Number(req.params.id);
	const category=await updatecategory({categoryID,name});
	res.status(200).json(category);
}catch(error){
	res.status(401).json(error.message);
}
};
const removeCategory=async(req,res)=>{
	try{
	const categoryID=Number(req.params.id);
	const category=await removecategory(categoryID);
	res.status(200).json(category);
}catch(error){
	res.status(401).json(error.message);
}
};
module.exports={addCategory,getAllCategories,getCategoryById,updateCategory,removeCategory};
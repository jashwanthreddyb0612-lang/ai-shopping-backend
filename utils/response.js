const successResponse=(res,message,data=null,status=200)=>{
	return res.status(status).json({
		success:true,
		message,
		data
	});
};
const errorResponse=(res,status=500,message)=>{
	return res.status(status).json({
		success:false,
		message
	});
};
module.exports={successResponse,errorResponse};
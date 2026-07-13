const dotenv=require("dotenv").config();
const express=require("express");
const app=express();
const pool=require("./config/db");
app.use(express.json());
const cors=require("cors");
app.use(cors());


const productRoutes=require("./routes/productRoutes");
const userRoutes=require("./routes/userRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const cartRoutes=require("./routes/cartRoutes");
const orderRoutes=require("./routes/orderRoutes");
const wishlistRoutes=require("./routes/wishlistRoutes");
const paymentRoutes=require("./routes/paymentRoutes");
const addressRoutes=require("./routes/addressRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const recomendationRoutes=require("./routes/recomendationRoutes");
const errorHandler=require("./middleware/errorMiddleware");

app.get("/",(req,res)=>{
	res.send("server running");
});


app.use("/users",userRoutes);
app.use("/products",productRoutes);
app.use("/categories",categoryRoutes);
app.use("/carts",cartRoutes);
app.use("/orders",orderRoutes);
app.use("/wishlist",wishlistRoutes);
app.use("/payments",paymentRoutes);
app.use("/addresses",addressRoutes);
app.use("/dashboards",dashboardRoutes);
app.use("/recomendations",recomendationRoutes);
app.use(errorHandler);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
	console.log(`server running on port ${PORT}`);
});

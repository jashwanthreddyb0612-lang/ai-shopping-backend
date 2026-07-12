const express=require("express");
const router=express.Router();
const middleware=require("../middleware/authMiddleware");
const {getRecomendations,smartSearch,getPersonalisedHomePage,chatAssistant}=require("../controllers/recomendationControllers");
router.get("/search",middleware,smartSearch);
router.get("/homepage",middleware,getPersonalisedHomePage);
router.post("/chatassistant",middleware,chatAssistant);
router.get("/:productID",middleware,getRecomendations);

module.exports=router
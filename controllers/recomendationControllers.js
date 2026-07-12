const {getproductbyid,getproductsbycategory,getrecentlyviewedcount,getrecentlyviewedproducts,getwishlistproducts,getpurchasedproducts,getsearchhistory,getfrequentlyboughttogether}=require("../models/aiproductModel");
const {smartsearch,savetosearchhistory,getallproducts,chatassistant}=require("../models/aiproductModel");

const chatAssistant=async(req,res)=>{
	try{
		const {message}=req.body;
        let category=null;
        let maximumprice=null;
        let minimumprice=null;

        const maximumPriceMatch=message.match(/\d+/);
        if(maximumPriceMatch){
        	maximumprice=Number(maximumPriceMatch[0]);
        }
        const categories=[
        	"mobile",
        	"laptop",
        	"watch",
        	"book",
        	"fashion",
        	"beauty"
        ];
        for(const c of categories){
          
          if(message.toLowerCase().includes(c)){
          	category=c;
          	break;
          }
        }

		const result=await chatassistant({category,minimumprice,maximumprice});
		res.json({
			detectedCategory:category,
			detectedMaximumPrice:maximumprice,
			totalproducts:result.rows.length,
			products:result.rows
		});

	}catch(error){
		res.status(500).json(error.message);
	}
};


const getPersonalisedHomePage=async(req,res)=>{
	try{
		const userID=req.user.id;

		const getAllProductsResult=await getallproducts();
		const AllProducts=getAllProductsResult.rows;

	    const recentlyViewedResult=await getrecentlyviewedproducts({userID});
        const recentlyiewedProducts=recentlyViewedResult.rows;

        const categoryInterest={};
        recentlyiewedProducts.forEach((item)=>{
        	const categoryID=item.category_id;
        	const views=Number(item.view_count);
        	if(!categoryInterest[categoryID]){
        		categoryInterest[categoryID]=0;
        	}
        	categoryInterest[categoryID] +=views;
        });




        const wishlistResult=await getwishlistproducts({userID});
        const wishlistproducts=wishlistResult.rows;

          const wishlistInterest={};
       wishlistproducts.forEach((item)=>{
       	const categoryID=item.category_id;
       	const views=Number(item.wishlist_count);
       	if(!wishlistInterest[categoryID]){
       		wishlistInterest[categoryID]=0;
       	}
       	wishlistInterest[categoryID] +=views;
       });


     

        const purchasedResult=await getpurchasedproducts({userID});
        const purchasedProducts=purchasedResult.rows;

         const purchasedInterest={};
        purchasedProducts.forEach((item)=>{
        	const categoryID=item.category_id;
        	const views=Number(item.purchase_count);
        	if(!purchasedInterest[categoryID]){
        		purchasedInterest[categoryID]=0;
        	}
        	purchasedInterest[categoryID] +=views;
        });


      

        const searchHistoryResult=await getsearchhistory({userID});
        const searchHistory=searchHistoryResult.rows;


        const searchInterest={};
        searchHistory.forEach((item)=>{
        	const categoryID=item.category_id;
        	const views=Number(item.search_count);
        	if(!searchInterest[categoryID]){
        		searchInterest[categoryID]=0;
        	}
        	searchInterest[categoryID]  +=views;
        });


        const scoredProducts=[];
        for(const p of AllProducts){
        	let score=0;
        
			const interest=categoryInterest[p.category_id] || 0;
			
			if(interest>=5){
				score +=15;

			}else if(interest>=3){
				score +=10;
			}else if(interest>=2){
				score +=5;
			}

			const wishlistscore=wishlistInterest[p.category_id]||0;
			if(wishlistscore>=3){
                score +=20;
			}else if(wishlistscore>=2){
				score +=15;
			}else if(wishlistscore>=1){
				score +=10;
			}
           

           const purchasedscore=purchasedInterest[p.category_id]||0;
          
           if(purchasedscore>=3){
           	score +=20;
           }else if(purchasedProducts>=1){
           	score +=10;
           }



           const searchedscore=searchInterest[p.category_id]||0;
           if(searchedscore>0){
           	score +=10;
           }


           scoredProducts.push({
				id:p.id,
				name:p.name,
				price:p.price,image:p.image,
				score,
				reason:"User interest + Wishlist + Purchased products + Search history"
			});

		};
		scoredProducts.sort((a,b)=>b.score-a.score);
		 res.json({
			homeProducts:scoredProducts.slice(0,5)
		});
        



}catch(error){
    res.status(500).json(error.message);
}
};


const smartSearch=async(req,res)=>{
	try{
		const searchTerm=req.query.search;
		const userID=req.user.id;
		const saveToHistory=await savetosearchhistory({searchTerm,userID});
		if(!searchTerm){
			res.json({message:"searchTerm is required"});
		}

		const result=await smartsearch({searchTerm});
		res.json({
			searchResults:result.rows.length,
			products:result.rows
		});

	}catch(error){
		res.status(500).json(error.message);
	}
};


const getRecomendations=async(req,res)=>{
	try{
		const productID=Number(req.params.productID);
		const userID=req.user.id
		
		const productResult=await getproductbyid({productID});
		const currentProduct=productResult.rows[0];
		if (!currentProduct){
			return res.status(404).json({message:"Product not found"});
		}


        const recentlyViewedResult=await getrecentlyviewedproducts({userID});
        const recentlyiewedProducts=recentlyViewedResult.rows;
              
        const categoryInterest={};
        recentlyiewedProducts.forEach((item)=>{
        	const categoryID=item.category_id;
        	const views=Number(item.view_count);
        	if(!categoryInterest[categoryID]){
        		categoryInterest[categoryID]=0;
        	}
        	categoryInterest[categoryID] +=views;
        });

       
       const wishlistResult=await getwishlistproducts({userID});
       const wishlistproducts=wishlistResult.rows;

       const wishlistInterest={};
       wishlistproducts.forEach((item)=>{
       	const categoryID=item.category_id;
       	const views=Number(item.wishlist_count);
       	if(!wishlistInterest[categoryID]){
       		wishlistInterest[categoryID]=0;
       	}
       	wishlistInterest[categoryID] +=views;
       });



        const purchasedResult=await getpurchasedproducts({userID});
        const purchasedProducts=purchasedResult.rows;
      

        const purchasedInterest={};
        purchasedProducts.forEach((item)=>{
        	const categoryID=item.category_id;
        	const views=Number(item.purchase_count);
        	if(!purchasedInterest[categoryID]){
        		purchasedInterest[categoryID]=0;
        	}
        	purchasedInterest[categoryID] +=views;
        });



        const searchHistoryResult=await getsearchhistory({userID});
        const searchHistory=searchHistoryResult.rows;


        const searchInterest={};
        searchHistory.forEach((item)=>{
        	const categoryID=item.category_id;
        	const views=Number(item.search_count);
        	if(!searchInterest[categoryID]){
        		searchInterest[categoryID]=0;
        	}
        	searchInterest[categoryID]  +=views;
        });



          const frequentlyBoughtResult=await getfrequentlyboughttogether({productID});
          const frequentlyBought=frequentlyBoughtResult.rows;
          const frequentlyBoughtMap={};
          frequentlyBought.forEach((item)=>{
          	frequentlyBoughtMap[item.product_id]=Number(item.bought.count);
          });



		const categoryID=currentProduct.category_id;
		const productsResult=await getproductsbycategory({categoryID,productID});
		const products=productsResult.rows;
		const scoredProducts=[];
		for(const p of products){
			let score=0;
			score +=50;
			const priceDifference=Math.abs(currentProduct.price-p.price);
			
			if(priceDifference<10000){
			  score +=20;

			}else if(priceDifference<30000){
				score +=10;

			}
			const popularityResult=await getrecentlyviewedcount({productID:p.id});
			const totalViews=Number(popularityResult.rows[0].count);
			if(totalViews>=3){
              
				score +=10;
			}else if(totalViews>=2){
             score +=5;
			}

			const interest=categoryInterest[p.category_id] || 0;
			
			if(interest>=5){
				score +=15;

			}else if(interest>=3){
				score +=10;
			}else if(interest>=2){
				score +=5;
			}

			const wishlistscore=wishlistInterest[p.category_id]||0;
			if(wishlistscore>=3){
                score +=20;
			}else if(wishlistscore>=2){
				score +=15;
			}else if(wishlistscore>=1){
				score +=10;
			}
           

           const purchasedscore=purchasedInterest[p.category_id]||0;
          
           if(purchasedscore>0){
           	score +=20;
           }



           const searchedscore=searchInterest[p.category_id]||0;
           if(searchedscore>0){
           	score +=10;
           }



           const boughttogetherscore=frequentlyBoughtMap[p.id]||0;
           if(boughttogetherscore>=5){
           	score +=20;
           }else if(getfrequentlyboughttogether>=3){
           	score +=15;
           }else if(getfrequentlyboughttogether>=1){
           	score +=10;
           }

			scoredProducts.push({
				id:p.id,
				name:p.name,
				price:p.price,image:p.image,
				score,
				reason:"Same category + price similarity + user interest + wishlist + purchased products + search history + getfrequently bought together"
			});

		};
		scoredProducts.sort((a,b)=>b.score-a.score);
		 res.json({
			product_ID:productID,
			recomendation:scoredProducts.slice(0,5)
		});

	}catch(error){
		console.error(error),
		 res.status(500).json({message:"Server.error"});

	}

};
module.exports={getRecomendations,smartSearch,getPersonalisedHomePage,chatAssistant};
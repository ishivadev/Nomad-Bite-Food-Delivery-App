import userModel from '../models/userModel.js'

//Add items to user cart [API]
const addToCart = async (req, res) => {
        
    try {        
        //console.log(req.body.userId);
        let userData = await userModel.findOne({ "_id": req.body.userId }); // The 'req.body.userId' is used from the auth.js 
        //console.log(userData);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) 
            {
                cartData[req.body.itemId] = 1;
            } 
        else {
                cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message:"Added to Cart"})
    
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//Remove items from user cart [API]
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ "_id": req.body.userId }); // The 'req.body.userId' is used from the auth.js 
        //console.log(userData);
        let cartData = await userData.cartData;
       if(cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
       }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData} )
        res.json({success:true, message:"Item deleted from User Cart."})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error" }) 
    }

}

//Fetch user cart data [API]
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById( req.body.userId ); // The 'req.body.userId' is used from the auth.js 
        //console.log(userData);
        let cartData = await userData.cartData;
        //console.log(userCartData);
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})
    }
}

export {addToCart, removeFromCart, getCart}
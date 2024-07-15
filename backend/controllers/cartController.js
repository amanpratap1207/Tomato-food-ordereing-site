import userModel from "../models/userModel.js"

// Add items to user cart:
const addToCart = async (req, res) => {
    try {
        // get the userData:
        let userData = await userModel.findById(req.body.userId);
        // to get the cartData from the userData:
        let cartData = await userData.cartData;
        /* Add to cart functionality: when the user have to add the data in cart then they will send the token &
        with they will send the item_id   */ 
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;          // itemId not available then set it to 1 
        } else {
            cartData[req.body.itemId] += 1;         // increase the itemId 
        }

        // update the cartData:
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Added To Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// Remove items from user cart:
const removeFromCart = async (req, res) => {
    try {
        // find userData:
        let userData = await userModel.findById(req.body.userId);
        // extract the cartData:
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {      // checking if the itemId is present or not , present(means>0)
            cartData[req.body.itemId] -= 1;
        }
        // update the new cartData:
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Removed From Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// Fetch user cart data:
const getCart = async (req, res) => {
    try {
        // find userData:
        let userData = await userModel.findById(req.body.userId);
        // extract the cartData:
        let cartData = await userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"}); 
    }
    
}


export {addToCart, removeFromCart, getCart};
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import StripePack from 'stripe'

const stripe = new StripePack(process.env.STRIPE_SECRET_KEY);

//[API] Placing user order for frontend
const placeOrder = async (req,res) => {
    const frontend_url = "https://nomadbite.onrender.com"
    // const frontend_url = "http://localhost:5173"
    // Create a new order in the database
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        // Clear the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        // Create an array of line items for the Stripe Checkout Session
        const line_items = req.body.items.map((item) => ({
            // Define the price data for each item
            price_data: {
                currency: "INR",
                product_data: { name:item.name },
                unit_amount: item.price*100*80
                },
            quantity: item.quantity
        }))

        // Add a delivery charge line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charge" },
                unit_amount: 2*100*80
                },
            quantity: 1
        })

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items, // Pass the line items array
            mode: 'payment', // Payment mode
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, //Orderid created here and will be use in different places
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        
        // Return the session URL to the client
        // Note: We're sending session.url, not session.success_url or session.cancel_url
        // This is because session.url is the URL that the customer needs to visit to start the payment process
        res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// [API] Verify the order and update the payment status
const verifyOrder = async (req,res) => {
    // Get the order ID and payment status from the request body
    const {orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Paid"})
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// [API] User orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }) //userId is decoded from token from the authmiddleware which is declare in route
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})
    }
}

//[API] Listing orders for Admin Panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

//[API] Update the Order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }

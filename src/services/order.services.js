const Cart = require('../models/cart.model')
const Order = require('../models/order.model')
const User = require('../models/user.model');
const initializePayment = require('./payment.services');

exports.placeOrder = async(userId)=>{

    const user = await User.findById(userId);

    if(!user){
        throw new Error ("User not found")
    }

    if(!user.address || !user.phone){
        throw new Error("Please update your address and phone number before placing an order");
    }

    const cartItems = await Cart.find({userId}).populate('productId')

    if(!cartItems.length){
        throw new Error("your cart is empty");   
    }


    const totalAmount = cartItems.reduce((sum, item)=>{
        
        const price = item.productId.price || 0;
        return sum + price * item.quantity
    }, 0)

    //adding payment data
    const paymentData = {
        tx_ref: `tx-${Date.now()}`,
        amount:totalAmount,
        currency:'NGN',
        redirect_url: 'https://spellahub.com',
        customer:{
            email:user.email,
            phoneNumber: user.phone,
            name:user.fullName,
        },
        customization:{
            title:"order Payment",
            description:"Payment for item in cart"
        },
    }
    
    
    const paymentResponse = await initializePayment(paymentData);
    
    console.log(paymentResponse);
    
    const order = await Order.create({
        userId,
        products: cartItems.map((item) =>({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
        })),
        totalAmount,
        paymentRef: paymentData.tx_ref,
        status: 'pending',
    });

    return {
        order,
        paymentLink: paymentResponse.data.link,
    }
}



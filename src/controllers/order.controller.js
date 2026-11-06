const orderServices = require('../services/order.services')



exports.placeOrder = async(req,res)=>{
    try{
        const userId = req.user._id

        const result = await orderServices.placeOrder(userId)

        res.status(201).json({
            message:"order Initialized successfully... proceed to payment",
            data: result,
        })
        
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:`Error failed to place Order: ${error.message}`,
        })      
        
    }
}


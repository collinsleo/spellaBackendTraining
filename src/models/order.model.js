const mongoose = require('mongoose')
const Product = require('./product.model')


const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        rwquired: true,
    },

    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                require:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                require:true
            }
        }
    ],

    totalAmount:{
        type:Number,
    },
    paymentRef:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending", "completed", "failed"],
        default:"pending",
    }
})


const Order = mongoose.model("Order", orderSchema)
module.exports = Order;
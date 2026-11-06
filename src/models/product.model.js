const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "product na,e is required"]
    },
    price:{
        type:Number,
        require:[true, "product price is require"]
    },
    quantity:{
        type:Number,
        require:[false, "product quantity is require"],
        default:0
    },
    description:{
        type:String,
        require:[true, "product description is require"]
    },
    category:{
        type:String,
        require:[true, "product category is required"]
    },
    inStock:{
        type:Number,
        require:[true, "product inStock is required"]
    },
    image:{
        type:String,
        require:[true, "product image is required"]
    },

},{timestamps:true}
    
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product
const productServices = require("../services/product.services")

const createProduct = (req,res)=>{
    try{
        const {name, description, price, category, inStock} = req.body

        if(!name || !description || !price || !category || inStock){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            message:"error creating product"
        })
        
    }

}
const productServices = require("../services/product.services")

const createProduct = async (req,res) => {
    try{
        
        const {name, description, price, category, inStock} = req.body

        if(!name || !description || !price || !category || !inStock){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const image = req.file.buffer

        const newProduct = await productServices.createProduct({name, description, price, category,inStock, image}) 

        return res.status(200).json({
            message:"product created successfully",
            product:newProduct
        })
        
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            message:"error creating product",
        })
        
    }

}



const getAllProducts = async (req,res) => {
    const query = req.query
    try{
        const products = await productServices.getAllProducts(query)
        return res.status(200).json({
            message:"all products fetched successfully",
            products
        })
    }catch(error){
        return res.status(400).json({
            message:"error fetching products",
            error:error.message
        })
    }
}

const getProductById = async (req,res) => {
    try{
        const product = await productServices.getProductById(req.params.id)
        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }
        return res.status(200).json({
            message:"product fetched successfully",
            product
        })

    }catch(error){
        return res.status(400).json({
            message:"error fetching product by Id",
            error:error.message
        })
    }
}

const updateProduct = async (req,res) => {
    try{
        const productId = req.params.id
        const updateData = req.body
        let image = null;
        if(req.file){
            image = req.file.buffer
        }

        const updatedProduct = await productServices.updateProduct(productId, updateData, image)

        if(!updatedProduct){
            return res.status(404).json({
                error:"product not found"
            })
        }
        return res.status(200).json({
            message:"product updated successfully",
            product: updatedProduct
        })

    }catch(error){
        return res.status(400).json({
            message:"error updating product",
            error:error.message
        })
    }
}
 

const deleteProduct = async (req,res) => {
    try{
        const productId = req.params.id
        const deletedProduct = await productServices.deleteProduct(productId)

        if(!deletedProduct){
            return res.status(404).json({
                error:"product not found"
            })
        }
        return res.status(200).json({
            message:"product deleted successfully",
            product: deletedProduct
        })

    }catch(error){
        return res.status(400).json({
            message:"error deleting product",
            error:error.message
        })
    }
}
 
module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct}

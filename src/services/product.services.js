const Product = require('../models/product.model')
const cloudinary =  require('../config/cloudinary.config')


exports. createProduct = async ({name, description, price, category, inStock, image})=>{
    const uploadResult = await cloudinary.uploader.upload_stream({
        resource_type:'image', folder:'products'
    }, 
    async(error,result)=>{
        if(error){
            throw new Error("Image upload failed"); 
        }

        const newProduct = new Product({
            name, 
            description, 
            price,
            category, 
            inStock,
            image: result.secure_url
        })

        
        await newProduct.save();
        return newProduct;

    })
    uploadResult.end(image)
    return;
}


exports. getAllProducts = async (query)=>{
    const filter = {};

    if (query.search) {
        const searchRegex = new RegExp(query.search, 'i'); // 'i' for case-insensitive search

        filter.$or = [
            { name: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
            { category: { $regex: searchRegex } }
        ]
    }
    

    const products = await Product.find(filter).sort({createdAt:-1})
    return products;
}

exports. getProductById = async (ProductById)=>{
    const products = await Product.findById(ProductById)
    return products;
}

exports. updateProduct = async (ProductById, updateData, image)=>{

    if(image){
        const uploadResult = await cloudinary.uploader.upload_stream({
            resource_type:'image', folder:'products'
        }, 
        async(error,result)=>{
            if(error){
                throw new Error("Image upload failed"); 
            } 
            updateData.image = result.secure_url;            
            return await Product.findByIdAndUpdate(ProductById, {...updateData, image: updateData.image}, {new:true, runValidators: true})   
        })
        uploadResult.end(image)
        return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(ProductById, updateData, {new:true, runValidators: true})
    return updatedProduct;     
}

exports. deleteProduct = async (ProductById)=>{
    return await Product.findByIdAndDelete(ProductById)
}




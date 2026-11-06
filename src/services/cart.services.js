const  Cart  = require('../models/cart.model');
const  Product  = require('../models/product.model');
const  User  = require('../models/user.model');

const addToCart = async (userId, productId, quantity) => {
    try{
        const user = await User.findById(userId);
        if(!user){
            throw new Error('User not found');
        }

        const product = await Product.findById(productId);
        if(!product){
            throw new Error('Product not found');
        }

        if(product.inStock < quantity){
            throw new Error(`Only ${product.inStock} items in stock`);
        }

        let cartItem = await Cart.findOne({ userId, productId });
        if(cartItem){
            cartItem.quantity += quantity;
            await cartItem.save();
            return cartItem;
        }else{
            cartItem = new Cart({
                userId,
                productId,
                quantity
            });
            await cartItem.save();
            return cartItem;
        }

    }catch(error){
        throw new Error('Error adding to cart: ' + error.message);
    }
}

const myCart = async (userId, productId, quantity) => {
    try{
        const user = await User.findById(userId);
        if(!user){
            throw new Error('User not found');
        }
        
        const cartItem = await Cart.findOne({userId}).populate('productId');
        
        if(!cartItem){
            return [];
        }
        
        return cartItem;   

    }catch(error){
        throw new Error('Error adding to cart: ' + error.message);
    }
}

const removeCart = async (cartId, userId) => {
    try{        
        const cartItem = await Cart.findOneAndDelete({_id:cartId, userId:userId});

        if(!cartItem){
            throw new Error('cart not found')
        }
        
        return {cartItem};   

    }catch(error){
        throw new Error('Error adding to cart: ' + error.message);
    }
}

const clearCart = async (userId) => {
    try{        
        const cartItem = await Cart.deleteMany({userId:userId});

        if(!cartItem){
            throw new Error('cart not found')
        }
        
        return {cartItem};   

    }catch(error){
        throw new Error('Error adding to cart: ' + error.message);
    }
}


module.exports = {
    addToCart,
    myCart, 
    removeCart,
    clearCart
}
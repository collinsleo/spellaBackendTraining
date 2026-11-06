const cartService = require('../services/cart.services');


const addToCart =  async (req, res)=>{
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
      
        const cart = await cartService.addToCart(userId, productId, quantity);
        return res.status(201).json({
            message: 'Product added to cart successfully',
            cart
        })

    }catch(error){
        console.log('Error adding to cart', error.message);
        return res.status(500).json({
            message: error.message
        })
        
    }
}

const myCart =  async (req, res)=>{
    try {
        const userId = req.user._id;
        
        const cart = await cartService.myCart(userId);

        return res.status(201).json({
            message: 'cart fetched successfully',
            cart
        })

    }catch(error){
        console.log('Error adding to cart', error.message);
        return res.status(500).json({
            message: error.message
        })
        
    }
}

const removeCart =  async (req, res)=>{
    try {
        const cartId = req.params.id;
        const userId = req.user._id;        
        
        const cart = await cartService.removeCart(cartId, userId);

        return res.status(201).json({
            message: 'cart removed successfully',
            cart
        })

    }catch(error){
        console.log('Error adding to cart', error.message);
        return res.status(500).json({
            message: error.message
        })
        
    }
}

const clearCart =  async (req, res)=>{
    try {
        const userId = req.user._id;        
        
        const cart = await cartService.clearCart(userId);

        return res.status(201).json({
            message: 'cart cleared successfully',
            cart
        })

    }catch(error){
        console.log('Error adding to cart', error.message);
        return res.status(500).json({
            message: error.message
        })
        
    }
}


module.exports = {
    addToCart,
    myCart,
    removeCart,
    clearCart
}
const express = require('express');
const router = express.Router();
const { addToCart, myCart, removeCart, clearCart} = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');


router.post('/add_to_cart', auth, addToCart);
router.get('/me', auth, myCart);
router.get('/remove_cart/:id', auth, removeCart);
router.get('/clear_cart', auth, clearCart);

module.exports = router;
const router = require('express').Router();

router.use('/auth', require('./auth.router'));
router.use('/user', require('./user.route'));
router.use('/product', require('./product.route'))
router.use('/cart', require('./cart.router'));
router.use('/order', require('./order.router'));


module.exports = router;
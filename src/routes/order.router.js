const router = require('express').Router();
const {placeOrder} = require('../controllers/order.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/place_order', auth, placeOrder)

module.exports = router;

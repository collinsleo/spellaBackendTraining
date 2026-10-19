const router =  require('express').Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/verify-email')

module.exports = router;

const router =  require('express').Router();
const { registerUser, loginUser, VerifyEmail , resendCode, getLoginCode, loginWithCode} = require('../controllers/auth.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', VerifyEmail)

router.post('/resend-code', resendCode)// resend verification code
router.post('/login-code', getLoginCode)// login with code
router.post('/login-with-code', loginWithCode)// 

module.exports = router;

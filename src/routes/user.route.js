const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.middleware")
const {getProfile} = require("../controllers/user.controllers")


router.get("/profile", auth, getProfile)



module.exports = router;
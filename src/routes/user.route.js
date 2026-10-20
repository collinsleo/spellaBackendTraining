const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.middleware")
const adminOnly = require("../middlewares/admin.middleware")
const {getProfile, fetchAllUsers} = require("../controllers/user.controllers")

router.get("/profile", auth, adminOnly, getProfile)
router.get("/all_users", auth, fetchAllUsers)

module.exports = router;
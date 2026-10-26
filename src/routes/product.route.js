const express = require("express")
const router = express.Router()

const {auth} = require("../middlewares/auth.middleware")
const {adminOnly} = require("../middlewares/admin.middleware")

const upload = require("../middleware/cloudinary.middleware")
const {createProduct} = require("../controllers/product.controller")
router.post
("/create-product", auth, adminOnly, upload.single("image"), createProduct) 

1
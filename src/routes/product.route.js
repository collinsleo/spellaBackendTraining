const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth.middleware")
const adminOnly = require("../middlewares/admin.middleware")

const upload = require("../middlewares/cloudinary.middleware")
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/product.controller")
// const productController = require("../controllers/product.controller")

router.post("/create", auth, adminOnly, upload.single("image"), createProduct) 
router.get("/all_products", getAllProducts) 
router.get("/get_product/:id", getProductById) 
router.patch("/update_product/:id", auth, adminOnly, upload.single("image"), updateProduct) 
router.delete("/delete_product/:id", auth, adminOnly, deleteProduct) 


module.exports = router
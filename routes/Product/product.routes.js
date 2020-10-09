
const { root } = require("npm");
const { createProduct, getProduct, deleteProduct, updateProduct, getProducts, getProductsCategories } = require("../../controllers/Product/product.controller");
const { getUserById } = require("../../controllers/User/user.controller");
const { isSignedin, isAuthenicated, isAdmin } = require("../../middlewares/Auth/auth.middleware");
const { getProductById, photo } = require("../../middlewares/Product/product.middleware");
const router = require("express").Router();


// handiling params
router.param("userId", getUserById);
router.param("productId", getProductById);

// products create
router.post("/create/product/:userId", isSignedin, isAuthenicated, isAdmin, createProduct);

// read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete route

router.delete("/product/:productId/:userId", 
        isSignedin, 
        isAuthenicated, 
        isAdmin,
        deleteProduct)


router.put("/product/:productId/:userId", 
        isSignedin, 
        isAuthenicated, 
        isAdmin,
        updateProduct)

// listing product

router.get("/products", getProducts);


router.get("/products/categories", getProductsCategories);

module.exports = router;
const router = require("express").Router();

const { createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../../controllers/category/category.controller");
const { getCategoryById } = require("../../middlewares/Category/category.middleware")
const { getUserById } = require("../../controllers/User/user.controller");
const { isSignedin, isAdmin, isAuthenicated } = require("../../middlewares/Auth/auth.middleware");

router.param("userId", getUserById);

router.param("categoryId",  getCategoryById);


// routes


router.post("/create/category/:userId", 
    isSignedin, 
    isAuthenicated, 
    isAdmin, 
    createCategory);

// read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// update
router.put("/category/:categoryId/:userId",  
        isSignedin, 
        isAuthenicated, 
        isAdmin, 
        updateCategory);

// delete 

router.delete("/delete/category/:categoryId/:userId", 
    isSignedin, 
    isAuthenicated, 
    isAdmin, 
    removeCategory)

module.exports = router;
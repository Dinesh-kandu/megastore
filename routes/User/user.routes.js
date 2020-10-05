const { getUserById, getUser, updateUser, userPurchaseList } = require("../../controllers/User/user.controller");
const { isSignedin, isAuthenicated, isAdmin } = require("../../middlewares/Auth/auth.middleware");

const router = require("express").Router();



router.param("userId", getUserById);

router.get("/user/:userId", isSignedin, isAuthenicated ,getUser);

router.put("/user/:userId", isSignedin, isAuthenicated, updateUser)
router.get("/orders/user/:userId", isSignedin, isAuthenicated, userPurchaseList);
// router.get("/users", getAllUsers);

module.exports = router;
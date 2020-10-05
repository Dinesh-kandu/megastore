const express = require("express");
const { check } = require("express-validator");
const { signOut, signUp, signIn } = require("../../controllers/Auth/auth.contoller");
const { isSignedin } = require("../../middlewares/Auth/auth.middleware");
const router = express.Router();



router.get("/signout",signOut);
router.post("/signup", 
[
   check("email", "email is required").isEmail(),
   check("password", "password should be at least 5 char")
            .isLength({ min: 5 })

],signUp)

router.post("/signin",
   [
      check("email", "Email is required").isEmail(),
      check("password", "Please add proper password")
            .isLength({ min: 2 })
   ]
 ,signIn)

 router.post("/test", isSignedin , (req, res) => {
   return res.send("Example of Protected Routes");
 });

module.exports = router;
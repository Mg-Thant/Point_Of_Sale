const express = require("express");

const Usercontroller = require("../controllers/user");
const validateUserData = require("../middlewares/validateUserData");

const router = express.Router();

// Register
// post /api/auth/register
router.post("/register", validateUserData, Usercontroller.register);

// Login
// post /api/auth/login
router.post("/login", validateUserData, Usercontroller.login);

module.exports = router;

const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/auth");

// Routes
router.get("/new_account", authController.loadSignUp);
router.post("/new_account", authController.signUp);
router.get("/sign_in", authController.loadSignIn);
router.post("/sign_in", authController.logIn);

module.exports = router;

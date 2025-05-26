const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/auth");

// Routes
router.get("/new_account", authController.loadSignUp);
router.post("/new_account", authController.signUp);

module.exports = router;

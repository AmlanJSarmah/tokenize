const express = require("express");
const router = express.Router();

// Controllers
const tokenController = require("../controllers/token");

// Routes
router.get("/", tokenController.allTokens);
router.get("/new", tokenController.newToken);
router.post("/new", tokenController.addNewToken);
router.get("/my_tokens", tokenController.myTokens);

module.exports = router;

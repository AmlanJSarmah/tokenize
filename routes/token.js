const express = require("express");
const router = express.Router();

// Controllers
const tokenController = require("../controllers/token");

// Routes

router.get("/", tokenController.allTokens);

router.get("/new", tokenController.newToken);

module.exports = router;

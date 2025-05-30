const express = require("express");
const router = express.Router();

const errorController = require("../controllers/error");

router.use("/500", errorController.serverError);

module.exports = router;

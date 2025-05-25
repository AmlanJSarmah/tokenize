const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main_pag.ejs");
});

router.get("/new", (req, res) => {
  res.render("new_token.ejs");
});

module.exports = router;

// Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

// Constants
const configs = require("./configs.json");

// Importing routes
const tokenRoutes = require("./routes/token");
const authRoutes = require("./routes/auth");

// Controllers
const errorController = require("./controllers/error");

const app = express();

// Decoding Body
app.use(bodyParser.urlencoded({ extended: false }));

// Setting Templating Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Setting public resources
app.use(express.static(path.join(__dirname, "public")));

// Session for Authentication
app.use(
  session({
    secret: configs.SESSION_STRING,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Using Routes
app.use(tokenRoutes);
app.use(authRoutes);
app.use(errorController.errorPage);

mongoose
  .connect("mongodb://localhost:27017/tokenize")
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });

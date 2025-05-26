// Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

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

// Using Routes
app.use(tokenRoutes);
app.use(authRoutes);
app.use(errorController.errorPage);

app.listen(3000);

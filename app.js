const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res) => {
  console.log(req.body);
  res.send("<body>Hello World</body>");
});

app.listen(3000);

exports.allTokens = (req, res) => {
  res.render("main_page.ejs");
};

exports.newToken = (req, res) => {
  res.render("new_token.ejs");
};

exports.addNewToken = (req, res) => {
  console.log(req);
  res.redirect("/");
};

exports.allTokens = (req, res) => {
  res.render("main_page.ejs", { isLoggedIn: false });
};

exports.newToken = (req, res) => {
  res.render("new_token.ejs");
};

exports.addNewToken = (req, res) => {
  res.redirect("/");
};

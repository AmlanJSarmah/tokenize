exports.allTokens = (req, res) => {
  res.render("main_page.ejs");
};

exports.newToken = (req, res) => {
  res.render("new_token.ejs");
};

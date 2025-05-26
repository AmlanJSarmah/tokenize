exports.allTokens = (req, res) => {
  res.render("main_page.ejs");
};

exports.newToken = (req, res) => {
  res.render("new_token.ejs");
};

exports.addNewToken = (req, res) => {
  console.log(req.body);
  console.log(req.body.from + "\n" + req.body.to + "\n" + req.body?.task);
  res.redirect("/");
};

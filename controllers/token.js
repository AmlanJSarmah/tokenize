exports.allTokens = (req, res) => {
  res.render("main_page.ejs", {
    isLoggedIn: req.session.isLoggedIn,
    userName: req.session.userName,
  });
};

exports.newToken = (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  res.render("new_token.ejs", {
    userName: req.session.userName,
  });
};

exports.addNewToken = (req, res) => {
  res.redirect("/");
};

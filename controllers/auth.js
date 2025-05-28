exports.loadSignUp = (req, res) => {
  res.render("auth.ejs", {
    signUpMode: req.query.signUpMode ? req.query.signUpMode : "true",
  });
};

exports.signUp = (req, res) => {
  res.redirect("/");
};

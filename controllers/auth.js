exports.loadSignUp = (req, res) => {
  res.render("auth.ejs");
};

exports.signUp = (req, res) => {
  console.log(req.body);
  res.redirect("/");
};

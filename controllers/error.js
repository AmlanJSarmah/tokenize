exports.errorPage = (req, res) => {
  res.render("error.ejs", {
    isLoggedIn: req.session.isLoggedIn,
    userName: req.session.userName,
  });
};

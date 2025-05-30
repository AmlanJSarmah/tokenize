exports.errorPage = (req, res) => {
  res.status(404).render("error.ejs", {
    isLoggedIn: req.session.isLoggedIn,
    userName: req.session.userName,
    serverError: false,
  });
};

exports.serverError = (req, res) => {
  res.render("error.ejs", {
    isLoggedIn: req.session.isLoggedIn,
    userName: req.session.userName,
    serverError: true,
  });
};

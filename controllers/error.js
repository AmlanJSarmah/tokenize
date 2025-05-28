exports.errorPage = (req, res) => {
  res.render("error.ejs", { isLoggedIn: false });
};

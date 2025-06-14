// Packages
const bcrypt = require("bcryptjs");
// Constants
const configs = require("../configs.json");
// Models
const User = require("../models/users");

// Controllers
exports.loadSignUp = (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  res.render("auth.ejs", {
    signUpMode: true,
  });
};

exports.loadSignIn = (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  res.render("auth.ejs", {
    signUpMode: false,
  });
};

exports.signUp = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  User.findOne({ email: req.body.email })
    .then((isFound) => {
      if (isFound) {
        res.redirect("/sign_in");
      } else {
        return bcrypt.hash(req.body.password, configs.SALT);
      }
    })
    .then((hashedPassword) => {
      const user = new User({
        name: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then(() => {
      res.redirect("/sign_in");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.logIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  let loggedInUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.redirect("/new_account");
      } else {
        loggedInUser = user;
        return bcrypt.compare(req.body.password, loggedInUser.password);
      }
    })
    .then((isAuthenticaed) => {
      if (isAuthenticaed) {
        req.session.isLoggedIn = true;
        req.session.email = loggedInUser.email;
        req.session.userName = loggedInUser.name;
        res.redirect("/");
      } else {
        res.redirect("/sign_in");
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

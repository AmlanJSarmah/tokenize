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

exports.signUp = (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  User.findOne({ email: req.body.email })
    .then((isFound) => {
      if (isFound) {
        res.redirect("/sign_in");
      } else {
        bcrypt
          .hash(req.body.password, configs.SALT)
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
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.logIn = (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.redirect("/new_account");
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((isAuthenticaed) => {
            if (isAuthenticaed) {
              req.session.isLoggedIn = true;
              req.session.email = req.body.email;
              req.session.userName = user.name;
              res.redirect("/");
            } else {
              res.redirect("/sign_in");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

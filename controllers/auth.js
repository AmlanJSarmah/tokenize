// Packages
const bcrypt = require("bcryptjs");
// Constants
const configs = require("../configs.json");
// Models
const User = require("../models/users");

// Controllers
exports.loadSignUp = (req, res) => {
  res.render("auth.ejs", {
    signUpMode: true,
  });
};

exports.loadSignIn = (req, res) => {
  res.render("auth.ejs", {
    signUpMode: false,
  });
};

exports.signUp = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((isFound) => {
      if (isFound) {
        res.redirect("/sign_in");
      } else {
        return bcrypt
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
  res.redirect("/");
};

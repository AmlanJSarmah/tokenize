// Models
const User = require("../models/users");
const Token = require("../models/token");

// Controllers
exports.allTokens = (req, res, next) => {
  Token.find({ isAccepted: false })
    .populate("creator")
    .then((tokens) => {
      res.render("main_page.ejs", {
        isLoggedIn: req.session.isLoggedIn,
        userName: req.session.userName,
        tokens: tokens,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

exports.newToken = (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/sign_in");
    return;
  }
  res.render("new_token.ejs", {
    userName: req.session.userName,
  });
};

exports.addNewToken = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  User.findOne({ email: req.session.email })
    .then((user) => {
      const token = new Token({
        name: req.body.name,
        from: req.body.from,
        to: req.body.to,
        creator: user._id,
        accepter: null,
        isAccepted: false,
      });
      return token.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

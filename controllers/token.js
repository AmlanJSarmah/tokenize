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
  let token;
  User.findOne({ email: req.session.email })
    .then((user) => {
      loggedInUser = user;
      token = new Token({
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

exports.myTokens = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/");
    return;
  }
  let loggedInUser;
  let generatedTokens;
  let acceptedTokens;
  User.findOne({ email: req.session.email })
    .then((user) => {
      loggedInUser = user;
      return Token.find({ creator: loggedInUser._id });
    })
    .then((tokens) => {
      generatedTokens = tokens;
      return Token.find({ accepter: loggedInUser._id });
    })
    .then((tokens) => {
      acceptedTokens = tokens;
      res.render("my_tokens", {
        isLoggedIn: req.session.isLoggedIn,
        userName: req.session.userName,
        generatedTokens: generatedTokens,
        acceptedTokens: acceptedTokens,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

exports.deleteToken = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/sign_in");
    return;
  }
  const tokenId = req.params.tokenId.split(":")[1];
  Token.deleteOne({ _id: tokenId })
    .then(() => {
      res.redirect("/my_tokens");
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

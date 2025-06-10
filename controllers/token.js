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
      return Token.find({ creator: loggedInUser._id }).populate("accepter");
    })
    .then((tokens) => {
      generatedTokens = tokens;
      return Token.find({ accepter: loggedInUser._id }).populate("creator");
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

exports.acceptToken = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/sign_in");
    return;
  }
  const tokenId = req.params.tokenId.split(":")[1];
  let loggedInUser;
  User.findOne({ email: req.session.email })
    .then((user) => {
      loggedInUser = user;
      return Token.findOne({ _id: tokenId });
    })
    .then((token) => {
      if (loggedInUser._id.equals(token.creator)) {
        res.redirect("/");
      } else {
        token.accepter = loggedInUser;
        token.isAccepted = true;
        Token.findByIdAndUpdate(token._id, { $set: token })
          .then(() => {
            res.redirect("/my_tokens");
          })
          .catch((err) => {
            const error = new Error(err);
            error.statusCode = 500;
            return next(error);
          });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

exports.revokeToken = (req, res, next) => {
  const tokenId = req.params.tokenId.split(":")[1];
  Token.findOne({ _id: tokenId })
    .then((token) => {
      token.accepter = null;
      token.isAccepted = false;
      return Token.findByIdAndUpdate(token._id, { $set: token });
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

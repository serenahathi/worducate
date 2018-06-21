let express = require("express");
let router = express.Router();
let getWord = require("../helpers/wordnik");
let Word = require("../models/word");
let passport = require("passport");
require("../config/passport")(passport);

// Retrieve and render WOTD
router.get("/", function (req, res) {
  getWord(function (getWord) {
    let Wotd = new Word({
      word: Math.random(),
      createdAt: new Date(),
      definition: getWord.firstDefinition,
      usage: getWord.example,
    });
    res.render("index", getWord);
    Word.create(Wotd);
  });
});

// Show all words
router.get("/words", isLoggedIn, function (req, res) {
  Word.getWords(function (err, words) {
    if (err) {
      throw err;
    }
    res.render("words", {
      words
    });
  });
});

// Add new word
router.post("/words", isLoggedIn, function (req, res) {
  Word.create({
    word: req.body.newword,
    createdAt: new Date(),
    definition: req.body.definition,
    usage: req.body.usage,
    status: "User"
  });
  res.redirect("/words");
});

// Show form to add new word
router.get("/words/new", isLoggedIn, function (req, res) {
  res.render("new");
});

// Show form to edit word
router.get("/words/:id/edit", isLoggedIn, function (req, res) {
  let id = req.params.id;
  Word.findById(id, function (err, words) {
    if (err) {
      throw err;
    }
    res.render("edit", {
      words
    });
  });
});

// Edit word
router.post("/words/:id", isLoggedIn, function (req, res) {
  let id = req.params.id;
  let words = {
    word: req.body.newword,
    createdAt: new Date(),
    definition: req.body.definition,
    usage: req.body.usage,
  };
  Word.findByIdAndUpdate(id, words, {
    new: true
  }, function (err) {
    if (err) {
      throw err;
    }
  });
  res.redirect("/words");
});

// router.post("/words/favourites", isLoggedIn, function (req, res) {
//   let id = req.params.id;
//   let words = {
//     word: req.body.newword,
//     createdAt: new Date(),
//     definition: req.body.definition,
//     usage: req.body.usage,
//   };
//   Word.findByIdAndUpdate(id, words, {
//     new: true
//   }, function (err) {
//     if (err) {
//       throw err;
//     }
//     if (word.favourite === true) {}
//   });
//   res.redirect("/words");
// });

// Sign up form
router.get("/signup", function (req, res) {
  res.render("signup", {
    message: req.flash("signupMessage")
  });
});

router.post("/signup", passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

// Log in form
router.get("/login", function (req, res) {
  res.render("login", {
    message: req.flash("loginMessage")
  });
});

router.post("/login", passport.authenticate("local-login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/signup");
});

function isLoggedIn(req, res, next) {
  console.log(req);
  console.log(req.isAuthenticated);
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
const express = require("express");
const router = express.Router();
const getWord = require("../helpers/wordnik");
const Word = require("../models/word");
const passport = require("passport");
require("../config/passport")(passport);

// Retrieve and render WOTD
router.get("/", function (req, res) {
  getWord(function (getWord) {
    let Wotd = new Word({
      word: getWord.word,
      createdAt: new Date(),
      definition: getWord.firstDefinition,
      usage: getWord.example,
    });
    res.render("index", getWord);
    Word.create(Wotd);
  });
});

// Show all words for specific user
router.get("/words", isLoggedIn, function (req, res) {
  Word.find({
    $and: [{
      $or: [{
        creator: null
      }, {
        creator: req.user
      }]
    }]
  }, function (err, words) {
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
    creator: req.user,
    createdAt: new Date(),
    definition: req.body.definition,
    usage: req.body.usage,
    status: "User"
  });
  res.redirect("/words", );
});

// Show form to add new word
router.get("/words/new", isLoggedIn, function (req, res) {
  res.render("new");
});

// Show form to edit word
router.get("/words/:id/edit", isLoggedIn, function (req, res) {
  let id = req.params.id;
  console.log(id);
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

router.post("/words/favourites/new", isLoggedIn, function (req, res) {
  console.log("req.body is the data that comes from the AJAX request");
  console.log(req.body);
  let word = req.body.word.trim();
  let definition = req.body.definition.trim();
  let usage = req.body.usage.trim();
  // Update the database here by changing the status of the record from 'favourite: false'
  // to 'favourite: true'
  res.redirect("/words");
});

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
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
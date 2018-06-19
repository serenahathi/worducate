let express = require("express");
let router = express.Router();
let getWord = require("../helpers/wordnik");
let Word = require("../models/word");

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

// Show all words
router.get("/words", function (req, res) {
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
router.post("/words", function (req, res) {
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
router.get("/words/new", function (req, res) {
  res.render("new");
});

// Show form to edit word
router.get("/words/:id/edit", function (req, res) {
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
router.post("/words/:id", function (req, res) {
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

module.exports = router;
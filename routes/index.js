let express = require("express");
let router = express.Router();
let getWord = require("../helpers/wordnik");
let Word = require("../models/word");

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

router.get("/words/new", function (req, res) {
  res.render("new");
});

router.post("/words", function (req, res) {
  res.redirect("/words");
})


module.exports = router;
let express = require('express');
let router = express.Router();
let superagent = require("superagent");
let request = require("request");
let getWord = require("../helpers/wordnik");
let Word = require('..//models/word');

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

// Renders words
router.get("/words", function (req, res) {
  Word.getWords(function (err, words) {
    if (err) {
      throw err;
    }
    // res.json(words[0].definition);
    // res.json(words);
    res.render("words", {
      words
    });
    console.log(words.length);
  });
});

module.exports = router;
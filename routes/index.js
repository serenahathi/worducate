let express = require('express');
let router = express.Router();
let superagent = require("superagent");
let request = require("request");
let getWord = require("../helpers/wordnik");
let Word = require('..//models/word');

router.get('/', function (req, res) {
  getWord(function (getWord) {
    res.render('index', getWord);
    let Wotd = new Word({
      word: getWord.word,
      createdAt: new Date(),
      definition: getWord.firstDefinition,
      usage: getWord.example,
    });

    Wotd.save(function (err) {
      if (err) return handleError(err);
    });


  });
});
module.exports = router;
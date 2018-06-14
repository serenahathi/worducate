let express = require('express');
let router = express.Router();
let superagent = require("superagent");
let request = require("request");
let wordOfTheDay = require("../helpers/wordnik");
var Word = require('..//models/word');


router.get('/', function (req, res) {
  wordOfTheDay(function (wordOfTheDay) {
    res.render('index', wordOfTheDay);
  });

  Word.create({
    word: wordOfTheDay.word,
    createdAt: new Date(),
    definition: wordOfTheDay.firstDefinition,
    usage: wordOfTheDay.example
  });
});

module.exports = router;
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

  Word.findById({

  });

});

module.exports = router;
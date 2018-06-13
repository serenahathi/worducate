let express = require('express');
let router = express.Router();
let superagent = require("superagent");
let request = require("request");
let wordOfTheDay = require("../helpers/wordnik");
let moment = require('moment');

router.get('/', function (req, res) {
  wordOfTheDay(function (wordOfTheDay) {
    res.render('index', wordOfTheDay);
  });
});

module.exports = router;
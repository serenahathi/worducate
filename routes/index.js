let express = require('express');
let router = express.Router();
let superagent = require("superagent");
let apiKey = "9da31cd4c5408dfe55c830266d80de19c98830e1da9f24313"
let request = require("request");

router.get('/', function(req, res) {
  res.render('index')
  request("https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=" + apiKey, function(err, res, body) {
  console.log(body.id);
});
});

module.exports = router;

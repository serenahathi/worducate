let express = require('express');
let router = express.Router();
let superagent = require("superagent");
let request = require("request");

router.get('/', function (req, res) {
  res.render('index')
  // should I wrap the request in a function -
  request("https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=" + process.env.API_KEY, function (err, res, body) {
    let result = JSON.parse(body);
    let word = result.word;
    let firstDefinition = result.definitions[0].text;
    let secondDefinition = result.definitions[1].text;
    let example = result.examples[0].text;
  });
});

module.exports = router;
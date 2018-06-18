let request = require("request");

function getWord(callback) {
  request("https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=" + process.env.API_KEY, function (err, res, body) {
    let result = JSON.parse(body);
    let wordOfTheDay = {
      word: result.word,
      firstDefinition: result.definitions[0].text,
      // secondDefinition: result.definitions[1].text,
      example: result.examples[0].text
    };
    callback(wordOfTheDay);
  });
}

module.exports = getWord;
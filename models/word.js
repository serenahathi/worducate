const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(new Date().setHours(1, 0, 0, 0))
  },
  definition: {
    type: String,
  },
  usage: {
    type: String,
  },
  status: {
    type: String,
    default: "API"
  },
  favourite: {
    type: Boolean,
    default: false
  }
});

let Word = module.exports = mongoose.model("Word", WordSchema);
// Creates the word model and exports it so index.js can access it

module.exports.getWords = function (callback) {
  Word.find(callback);
}

module.exports.addWord = function (word) {
  Word.create(word);
};
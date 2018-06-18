const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    unique: true,
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

module.exports.getWords = function (callback) {
  Word.find(callback);
};
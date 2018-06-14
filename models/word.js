const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
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
    type: Boolean
  }
});

module.exports = mongoose.model("Word", WordSchema);
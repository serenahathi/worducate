const mongoose = require("mongoose");


const WordSchema = new mongoose.Schema({
  local: {
    email: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

let User = module.exports = mongoose.model("User", WordSchema);

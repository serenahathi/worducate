// Import mongoose model
const mongoose = require('mongoose');

let mongoDB = "mongodb://localhost:27017/worducate";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
module.exports = {
  mongoose
};
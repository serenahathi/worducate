const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/worducate', function (err, db) {
  console.log("Successfully connected to server")
  db.close();
});
module.exports = {
  mongoose
};
// Import mongoose model
const mongoose = require('mongoose');

// // Set up default mongoose connection
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/worducate', function (err, db) {
//   console.log("Mongoose: Successfully connected to server")
//   db.close();
// });
// module.exports = {
//   mongoose
// };

let mongoDB = "mongodb://localhost:27017/worducate";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
module.exports = {
  mongoose
};
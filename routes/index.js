let express = require('express');
let router = express.Router();
let request = require("superagent");


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

let getUserFollowers = function(username, callback) {
  request
    .get(`https://api.github.com/users/${username}/followers`)
    .end(function(err, res) {
      if (!err) {
        let users = res.body.map(function(user) {
          return user.login;
        });
        callback(null, users);
      } else {
        callback("Error occured!");
      }
    });
};
module.exports.getUserFollowers = getUserFollowers;
// module.exports = router;

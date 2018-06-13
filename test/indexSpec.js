let expect = require("chai").expect;
let nock = require("nock");
let getUserFollowers = require("../routes/index").getUserFollowers
let response = require("./response");

describe("GET followers", function(){

  beforeEach(function() {
    nock('https://api.wordnik.com')
    .get("v4/words.json/wordOfTheDay?date=2018-06-12&api_key=YOURAPIKEY")
    .reply(200,response);
  });

  it("returns an object containing a word of the day", function(done){
    this.timeout(3000)
    // if the test takes longer than 3 scnds it will fail
    
    getUserFollowers("octocat", function(err, followers){
      // it should return an array object
      expect(Array.isArray(followers)).to.equal(true);
      // there should be more than 1 element in the array
      expect(followers).to.have.length.above(1);
      // elements in the array should be a string
      followers.forEach(function(follower) {
        expect(follower).to.be.a("string");
      })
      done();
    })
  })
})

// We import a getUserFollows function from index.js
// The function takes a git username & a callback function
// we test that the array of folowers has at least 1 follower and is composed of strings
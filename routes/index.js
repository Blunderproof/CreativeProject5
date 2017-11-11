var express = require('express');
var router = express.Router();
/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useMongoClient: true }); //Connects to a mongo database called "commentDB"

var siteSchema = mongoose.Schema({ //Defines the Schema for this database
URI: String,
bio: String,
imgURL: String
});

var Sites = mongoose.model('Sites', siteSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});


router.post('/submit', function(req, res, next) {
  console.log("SUBMITTED");
  console.log(req.body);

  var newSite = new Sites(req.body);
  console.log(newSite);
  newSite.save(function(err, post) {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  })
})

router.get('/site', function(req, res, next) {
  Sites.find(function(err, siteList) {
    if (err) return console.error(err);
    else {
      console.log(siteList);
      res.json(siteList);
    }
  })
})



// router.post('/comment', function(req, res, next) {
//   console.log("POST comment route"); //[1]
//   console.log(req.body); //[2]
//
//   var newcomment = new Comment(req.body); //[3]
//   console.log(newcomment); //[3]
//   newcomment.save(function(err, post) { //[4]
//     if (err) return console.error(err);
//     console.log(post);
//     res.sendStatus(200);
//   });
// });
//
// /* GET comments from database */
// router.get('/comment', function(req, res, next) {
//
//   Comment.find(function(err,commentList) { //Calls the find() method on your database
//      if (err) return console.error(err); //If there's an error, print it out
//      else {
//        console.log(commentList); //Otherwise console log the comments you found
//        res.json(commentList); //Then send the comments
//
//      }
//    })
// });
//
// router.get('/deleteAll', function(req, res, next) {
//   Comment.remove({}, function (err) {
//   console.log("Collection deleted");
//   res.sendStatus(200);
//   });
// });

module.exports = router;

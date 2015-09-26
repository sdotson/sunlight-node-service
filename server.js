var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/sunlight';

var jobSchedule = require('./job-schedule.js');
jobSchedule.setupJobs();


var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/sunlight", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(8080);
  console.log("Listening on port 3000");
});

// Reuse database object in request handlers
app.get("/", function(req, res) {
    var json = [];

  db.collection("candidates").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        json.push(json);
      }
      else {
        res.end();
      }
    });
    res.send(results);
  });
});





/*app.get('/candidates', function(request, response) {

    MongoClient.connect(url, function(err, db) {

        var data = db.collection('candidates').find();
        console.log(data)
        db.close();
      
    });
});

app.listen(8080);*/
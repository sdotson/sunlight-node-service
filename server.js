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
  console.log("Listening on port 8080");
});

// Reuse database object in request handlers
app.get("/", function(req, res) {

  db.collection("candidates").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        res.json(doc);
      } else {
        res.end();
      };
    });
  });
});
var request = require('request');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/sunlight';

function insertDocument(results, db, callback) {
    var data = {
        data: results
    };

    db.collection('candidates').remove();

    db.collection('candidates').save(data, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the candidates collection.");
  });
};

function sortByKey(array, key) {
    return array.sort(function(a,b) {
        var x = parseFloat(a[key]), 
            y = parseFloat(b[key]);
        return ((x < y) ? -1 : ((x > y) ? 1: 0));
    });
}


exports.getCandidates = function(agenda) {

    agenda.define('get candidates', function(job, done) {

        var options = {
            url: 'http://realtime.influenceexplorer.com/api//candidates/?apikey=5fb0ee006d904354961ae1e83e80011b&office=P&format=json',
            method: 'GET',
            qs: {
                'apikey': '5fb0ee006d904354961ae1e83e80011b', 
                'office': 'P',
                'format': 'json'
            }
        }

        var results = [], count;


        function insertData(results) {
            console.log('final results in');
            results = sortByKey(results, "total_contributions").reverse();
            results = results.slice(0, 25);

            var outputFilename = '../candidates.json';

            fs.writeFile(outputFilename, JSON.stringify(results, null), function(err) {
                if(err) {
                  console.log(err);
                } else {
                  console.log("JSON saved to " + outputFilename);
                }
            }); 

            MongoClient.connect(url, function(err, db) {
              assert.equal(null, err);

              insertDocument(results, db, function() {
                  db.close();
              });
            });


        }


        function getMoreResults(url) {

            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // Print out the response body
                    var jsonResponse = JSON.parse(body),
                        next = jsonResponse.next;

                    console.log('adding more results...');
                    results = results.concat(jsonResponse.results);

                    if (next) {
                        getMoreResults(next);
                    } else {
                        insertData(results);
                    };
                }
            });

        }


        request(options, function (error, response, body) {
            
            if (!error && response.statusCode == 200) {
                
                var jsonResponse = JSON.parse(body);
                results = jsonResponse.results;
                count = jsonResponse.count;

                console.log('first results in');

                if (jsonResponse.next) {
                    getMoreResults(jsonResponse.next);
                };
            }
        });
      done();
    });
}
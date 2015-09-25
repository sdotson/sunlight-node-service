var request = require('request');
var express = require('express');
var fs = require('fs');
var app = express();

var options = {
    url: 'http://realtime.influenceexplorer.com/api//candidates/?apikey=5fb0ee006d904354961ae1e83e80011b&office=P&format=json',
    method: 'GET',
    qs: {
        'apikey': '5fb0ee006d904354961ae1e83e80011b', 
        'office': 'P',
        'format': 'json'
    }
}

var results, count;


function insertData(results) {
    console.log('final results');
    console.log(results);

    var outputFilename = 'candidates.json';

    fs.writeFile(outputFilename, JSON.stringify(results, null), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    }); 
}


function getMoreResults(url) {

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            var jsonResponse = JSON.parse(body),
                next = jsonResponse.next;

            console.log('adding more results...');

            results.concat(jsonResponse.results);

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

app.listen(8080);
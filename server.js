var request = require('request');
var express = require('express');

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
    console.log(results);
}


function getMoreResults(url) {

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            results.concat(response.body['results']);

            console.log('adding more results...');

            if (body.next) {
                getMoreResults(response.body.next);
            } else {
                insertData(results);
            };
        }
    });

}


// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        jsonResponse = JSON.parse(body);
        results = jsonResponse.results;
        count = jsonResponse.count;

        console.log('first results in');
        console.log(results);

        /*if (response.body.next) {
            getMoreResults(response.body.next);
        };*/
    }
});

app.listen(8080);
var request = require('request');

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


function getMoreResults(url) {

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            results.concat(body.results);

            if (body.next) {
                getMoreResults(body.next);
            };
        }
    });
    
}



// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        results = body.results;
        count = body.count

        if (body.next) {
            getMoreResults(body.next);
        };
    }
});
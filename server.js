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

var results, count, next;


function getMoreResults(url) {
    $new_data = json_decode(httpGet($url));

    $data = array_merge($data, $new_data->results);

    if (!is_null($new_data->next)) {
        getMoreCandidates($new_data->next);
    } else {
        final_success();
    };
    
    var thisOptions = {
        url: 'http://realtime.influenceexplorer.com/api//candidates/?apikey=5fb0ee006d904354961ae1e83e80011b&office=P&format=json',
        method: 'GET',
        qs: {
            'apikey': '5fb0ee006d904354961ae1e83e80011b', 
            'office': 'P',
            'format': 'json'
        }
    }


    request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        next = body.next;
        results = body.results;
        count = body.count

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
        next = body.next;
        results = body.results;
        count = body.count

        if (body.next) {
            getMoreResults(body.next);
        };
    }
});
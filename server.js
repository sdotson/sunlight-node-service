/*var express = require('express');
var app = express();*/

var jobSchedule = require('./job-schedule.js');
jobSchedule.setupJobs();

console.log('started...');

/*app.get('/candidates', function(request, response) {
    response.json({});
});

app.listen(8080);*/
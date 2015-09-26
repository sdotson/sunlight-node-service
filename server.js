var express = require('express');
var app = express();

var jobSchedule = require('./job-schedule.js');
jobSchedule.setupJobs();

app.get('/candidates', function(request, response) {
    response.json({whoa: 'hey man'});
});

app.listen(8080);
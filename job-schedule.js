exports.setupJobs = function() {
    // Setup agenda
    var candidatesJob = require('./jobs/candidates-job.js');

    // Setup agenda
    var Agenda = require("Agenda");
    var agenda = new Agenda({db: { address: 'localhost:27017/agenda-example'}});

    candidatesJob.getCandidates(agenda);

    agenda.every('1 day', 'get candidates');

    agenda.start();
}
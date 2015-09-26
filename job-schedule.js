exports.setupJobs = function() {
    // Setup agenda
    var candidatesJob = require('./jobs/candidates-job.js');
    var sampleJob = require('./jobs/sample-job.js');


    // Setup agenda
    var Agenda = require("Agenda");
    var agenda = new Agenda({db: { address: 'localhost:27017/agenda-example'}});

    candidatesJob.getCandidates(agenda);
    sampleJob.showMessage(agenda);

    agenda.every('2 seconds', 'show message');
    agenda.every('3 seconds', 'get candidates');

    agenda.start();
}
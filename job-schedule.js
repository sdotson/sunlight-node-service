exports.setupJobs = function() {
    // Setup agenda
    var Agenda = require("Agenda");
    var agenda = new Agenda({db: { address: 'localhost:8080/job-schedule'}});

    agenda.start();
}
# sunlight-node-service

As an exercise to learn practical Node/Express/MongoDB, I decided to port over a version of this that I originally wrote in PHP/MySQL/Cron.

This was created because I wanted to avoid making 10 API calls jsut to render the home page of my <a href="https://github.com/sdotson/campaign-finance">angular capston application</a>. The Sunlight Foundation API doesn't provide an easy way to query just the top x candidates in terms of fundraising. There are literally 100s. As a result I created this cron job to run daily so that I could reduce the API calls from 10 to 1 for my Angular application.

The node cron-like functionality is created via the <a href="https://github.com/rschmukler/agenda">Agenda</a> module and MongoDB (for persistance).

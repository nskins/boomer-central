# Boomer Central

Boomer is our family dog and great friend. To remember his legacy for all time, we are developing this fan website to host images and stories about Boomer. Currently, we are working on thorough testing for the existing codebase before any additional functionality. If you have experience in Express & Jest mocking, and would like to get involved, then please contact the owner (nskins@umich.edu). Also stay tuned for more opportunities!

## Setup

In order to setup MongoDB (you only need to do this once), first run the MongoDB daemon process in one terminal:

```bash
$ mongod
```

In another terminal, connect via the Mongo shell:

```bash
$ mongo
```

Then run the following commands in the Mongo shell:

```mongo
$ use boomer-central
$ db.createCollection('users')
```

In the future, we would like to automate these MongoDB migrations.

Install the dependencies, and then, with the MongoDB daemon process still running, start the server (port 3000):

```bash
$ npm install
$ bower install
$ npm start
```

If desired, run the test suite (ensure the server is not already running):

```bash
$ npm test
```

## Tech Stack

- Node.js - Server-side Javascript
- Express - Web application framework
- MongoDB - Document-oriented database
- Bootstrap 4 - CSS framework
- Pug - Template engine (may change in future)
- Jest - Delightful Javascript testing
- Nightmare - UI testing via browser automation
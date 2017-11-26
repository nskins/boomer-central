# Boomer Central

Boomer is a doggo like none other. This fan site aims to be the hottest place on the web for news, pictures, and discussion of our favorite pup.

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

Node.js - server-side Javascript
Express - web application framework
MongoDB - document-oriented database
Bootstrap 4 - CSS framework
Pug - Template engine (may change in future)
Jest - Delightful Javascript testing
Nightmare - UI testing via browser automation

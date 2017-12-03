# Boomer Central [![Build Status](https://travis-ci.org/nskins/boomer-central.svg?branch=master)](https://travis-ci.org/nskins/boomer-central)

Boomer is our family dog and great friend. To remember his legacy for all time, we are developing this fan website to host images and stories about Boomer. Our ultimate goal is to create a more abstract website so that one could host a similar website for one's own family pet. If you would like to get involved, please see our issues or contact the owner (nskins@umich.edu).

## Setup

### Docker (recommended)

Use Docker to assemble the application and its services:

```bash
$ docker-compose build
```

Run the application (available on port 3000):

```bash
$ docker-compose up -d
```

If desired, run the test suite:

```bash
$ docker-compose exec web npm test
```

Stop the application:

```bash
$ docker-compose down
```

### Without Docker

Run the MongoDB daemon process in one terminal:

```bash
$ mongod
```

In another terminal, install the dependencies and start the server (port 3000):

```bash
$ npm install
$ bower install
$ npm start
```

In a third terminal, if desired, run the test suite:

```bash
$ npm test
```

## Tech Stack

### Application

- **Node.js** - Server-side JavaScript
- **Express** - Web application framework
- **MongoDB** - Document-oriented database
- **Bootstrap 4** - CSS framework
- **Pug** - Template engine (may change in future)

### Continuous Delivery

- **Jest** - Delightful JavaScript testing
- **Docker** - Software containerization platform
- **Travis CI** - Continuous integration service

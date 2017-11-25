const app = require('../app/app');
const config = require('./config');
const Nightmare = require('nightmare');
const request = require('supertest');

// This helper ensures that the specified path loads without error.
var pathLoads = (url, done) => {
  request(app)
    .get(url)
    .expect(200, done);
};
module.exports.pathLoads = pathLoads;

// Wrapper for a test w/ pathLoads.
module.exports.testPathLoads = function(url) {
  test('It should load without error', done => {
    pathLoads(url, done);
  });
}

// This test ensures that by clicking the specified selector,
// the user will be redirected to the specified destination.
// TODO: we could abstract the starting URL as an argument.
module.exports.testNavigateTo = function(selector, destination) {
  test('It should navigate there via the selector', done => {
    new Nightmare()
      .goto(config.HOST)
      .click(selector)
      .url()
      .end()
      .then(url => {
        expect(url).toBe(destination);
        done();
      })
      .catch(done);
  });
}
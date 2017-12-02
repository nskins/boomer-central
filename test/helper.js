const app = require('../app/app');
const config = require('./config');
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
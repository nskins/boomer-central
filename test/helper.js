const Nightmare = require('nightmare');

// This helper ensures that the specified url loads without error.
var pageLoads = (url, done) => {
  new Nightmare()
    .goto(url)
    .url() // The final state of the nightmare process can be
    .end() // used as an argument to the following callback.
    .then(url => {
      expect(url).toBe(url);
      done(); // Call the test function's callback at the end.
    })
    .catch(done); // Catch an error and pass the callback.
};
module.exports.pageLoads = pageLoads;

// Wrapper for a test w/ pageLoads.
module.exports.testPageLoads = function(url) {
  test('It should load without error', done => {
    pageLoads(url, done);
  });
}

// This test ensures that by clicking the specified selector,
// the user will be redirected to the specified destination.
// TODO: we could abstract the starting URL as an argument.
module.exports.testNavigateTo = function(selector, destination) {
  test('It should navigate there via the selector', done => {
    new Nightmare()
      .goto('http://localhost:3000/')
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
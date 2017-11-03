const Nightmare = require('nightmare');

// First Nightmare & Jest test: see below for important notes.
module.exports.testPageLoads = function(url) {
  test('It should load without error', done => {
    new Nightmare()
      .goto(url)
      .url() // The final state of the nightmare process can be
      .end() // used as an argument to the following callback.
      .then(url => {
        expect(url).toBe(url);
        done(); // Call the test function's callback at the end.
      })
      .catch(done); // Catch an error and pass the callback.
  });
}
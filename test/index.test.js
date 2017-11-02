const Nightmare = require('nightmare');

describe('/ (Index Page)', () => {
  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  // First Nightmare & Jest test: see below for important notes.
  test('It should load without error', done => {
    nightmare.goto('http://localhost:3000/')
      .url() // The final state of the nightmare process can be
      .end() // used as an argument to the following callback.
      .then(url => {
        expect(url).toBe('http://localhost:3000/');
        done(); // Call the test function's callback at the end.
      })
      .catch(done); // Catch an error and pass the callback.
  });
});
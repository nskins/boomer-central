const helper = require('./helper');

describe('/ (Index Page)', () => {
  helper.testPageLoads('http://localhost:3000/');
});
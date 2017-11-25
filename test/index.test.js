const config = require('./config');
const helper = require('./helper');

describe('/ (Index Page)', () => {
  helper.testPageLoads(config.HOST + '/');
});
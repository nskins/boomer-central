const config = require('./config');
const helper = require('./helper');

var url = config.HOST;
url.pathname = '/signup';

describe('/signup (Signup Page)', () => {
  helper.testPathLoads(url.pathname);
});
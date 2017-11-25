const config = require('./config');
const helper = require('./helper');

var url = config.HOST;
url.pathname = '/login';

describe('/login (Login Page)', () => {
  helper.testPathLoads(url.pathname);
  helper.testNavigateTo('.login-link', url.href);
});
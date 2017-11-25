const config = require('./config');
const helper = require('./helper');

const url = config.HOST + '/login';

describe('/login (Login Page)', () => {
  helper.testPageLoads(url);
  helper.testNavigateTo('.login-link', url);
});
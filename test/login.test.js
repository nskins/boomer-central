const helper = require('./helper');

const url = 'http://localhost:3000/login';

describe('/login (Login Page)', () => {
  helper.testPageLoads(url);
  helper.testNavigateTo('.login-link', url);
});
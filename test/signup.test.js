const helper = require('./helper');

const url = 'http://localhost:3000/signup';

describe('/signup (Signup Page)', () => {
  helper.testPageLoads(url);
  helper.testNavigateTo('.signup-btn', url);
});
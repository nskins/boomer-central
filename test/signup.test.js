const config = require('./config');
const helper = require('./helper');

const url = config.HOST + '/signup';

describe('/signup (Signup Page)', () => {
  helper.testPageLoads(url);
  helper.testNavigateTo('.signup-link', url);
});
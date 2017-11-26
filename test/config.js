const { URL } = require('url');

// Some Nightmare tests require a large timeout window.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

module.exports.HOST = new URL('http://localhost:3000');
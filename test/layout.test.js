const helper = require('./helper');
const Nightmare = require('nightmare');

const url = 'http://localhost:3000/';

describe('Layout', () => {
  test('Bootstrap CSS file loads without error', done => {
    new Nightmare()
      .goto(url)
      .evaluate(() => {
        return document.querySelector('#bootstrap-css').href;
      })
      .end()
      .then(href => {
        helper.pageLoads(href, done);
      })
      .catch(done);
  });
});
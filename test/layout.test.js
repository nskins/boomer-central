const helper = require('./helper');
const Nightmare = require('nightmare');

const url = 'http://localhost:3000/';

// Test that the specified resource (name) loads.
// It can be found by the selector on the layout page.
var testResourceLoads = (name, selector) => {
  test(name + ' loads without error', done => {
    new Nightmare()
      .goto(url)
      .evaluate(selector => {
        return document.querySelector(selector).href;
      }, selector)
      .end()
      .then(href => {
        helper.pageLoads(href, done);
      })
      .catch(done);
  });
};

describe('Layout', () => {
  testResourceLoads('Bootstrap CSS', '#bootstrap-css');
});
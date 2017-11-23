const helper = require('./helper');
const Nightmare = require('nightmare');
const path = require('path');

const url = 'http://localhost:3000/';

// Test that the specified resource (name) loads.
// It can be found by the selector on the layout page.
var testResourceLoads = (name, selector) => {
  var extension = path.extname(name);
  test(name + ' should load without error', done => {
    new Nightmare()
      .goto(url)
      .evaluate((extension, selector) => {
        var node = document.querySelector(selector);
        switch(extension) {
          case '.css':
            return node.href;
          case '.js':
            return node.src;
        }
      }, extension, selector)
      .end()
      .then(href => {
        helper.pageLoads(href, done);
      })
      .catch(done);
  });
};

describe('Layout', () => {
  testResourceLoads('bootstrap.css', '#bootstrap-css');
  testResourceLoads('style.css', '#style-css');
  testResourceLoads('jquery.js', '#jquery-js');
  testResourceLoads('popper.js', '#popper-js');
  testResourceLoads('bootstrap.js', '#bootstrap-js');
});
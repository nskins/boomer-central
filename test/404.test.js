const app = require('../app/app');
const request = require('supertest');

describe('404 Page', () => {
  test('It should return 404 on unidentified paths', done => {
    request(app)
      .get('/this_isnt_real') // Swans reference.
      .expect(404, done);
  });
});
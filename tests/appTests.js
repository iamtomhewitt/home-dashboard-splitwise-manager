const request = require('supertest');
const assert = require('assert');
require('dotenv').config();

describe('App tests', () => {
  let server;

  before(() => {
    server = require('../app').listen(3002);
  });

  after(() => {
    server.close();
  });

  it('gives a response', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        const { version } = require('../package.json');
        const status = '💰 SERVER OK';

        assert.equal(response.body.version, version);
        assert.equal(response.body.status, status);

        return done();
      });
  });
});

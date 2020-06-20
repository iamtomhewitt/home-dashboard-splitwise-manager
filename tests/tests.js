const request = require('supertest');
const assert = require('assert');
require('dotenv').config();

const groupId = process.env.GROUP_ID;

describe('Group tests', () => {
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

  it('gives 200 when getting group info', (done) => {
    request(server)
      .get(`/group?groupId=${groupId}&apiKey=${process.env.API_KEY}`)
      .expect(200)
      .end((err, response) => {
        if (err) {
          assert.fail(err.message);
          return done(err);
        }

        assert.notEqual(response.body, null);
        assert.notEqual(response.body.groupName, null);
        assert.notEqual(response.body.lastUpdated, null);
        assert.notEqual(response.body.expenses, null);

        return done();
      });
  });

  it('gives 400 when no parameters specified', (done) => {
    request(server)
      .get('/group')
      .expect(400)
      .end((err, response) => {
        if (err) {
          assert.fail(err.message);
          return done(err);
        }

        const { code, message } = response.body;
        assert.equal(code, 400);
        assert.equal(message, 'No API key specified');

        return done();
      });
  });

  it('gives 401 when api key is incorrect', (done) => {
    request(server)
      .get('/group?apiKey=incorrect')
      .expect(401)
      .end((err, response) => {
        if (err) {
          assert.fail(err.message);
          return done(err);
        }

        const { code, message } = response.body;
        assert.equal(code, 401);
        assert.equal(message, 'API key is incorrect');

        return done();
      });
  });

  it('/group gives 500 when using an incorrect group id', (done) => {
    request(server)
      .get(`/group?groupId=12345678910&apiKey=${process.env.API_KEY}`)
      .expect(500)
      .end((err, response) => {
        if (err) {
          assert.fail(err.message);
          return done(err);
        }

        const { code, message } = response.body;
        assert.equal(code, 500);
        assert.notEqual(message, null);

        return done();
      });
  });
});

const request = require('supertest');
const assert = require('assert');
const express = require('express');
const sinon = require('sinon');
const loaders = require('../../src/loaders');
const splitwiseService = require('../../src/services/splitwise');
const config = require('../../src/config');

describe('api/group', () => {
  let server;

  before(async () => {
    const app = express();
    await loaders(app);

    server = app.listen(process.env.PORT || 3002, (err) => {
      if (err) {
        assert.fail(err);
      }
    });
  });

  after(() => {
    server.close();
  });

  it('gives correct response when api key invalid', (done) => {
    request(server)
      .get('/group?groupId=12345&apiKey=123')
      .expect(401)
      .end((err, response) => {
        if (err) {
          assert.fail(err);
        }
        assert.strictEqual(response.body.message, 'API key is invalid!');
        return done();
      });
  });

  it('gives correct response when group id missing', (done) => {
    request(server)
      .get(`/group?apiKey=${config.apiKey}`)
      .expect(400)
      .end((err, response) => {
        if (err) {
          assert.fail(err);
        }
        assert.strictEqual(response.body.message, 'Group ID missing from query!');
        return done();
      });
  });

  it('returns data from request', (done) => {
    const stub = sinon.stub(splitwiseService, 'getSplitwiseData').returns({
      name: 'Test Group',
      updated_at: '2020-10-14T07:47:00Z',
      members:
        [{
          id: 1,
          first_name: 'Person A',
          last_name: 'Person A',
        },
        {
          id: 2,
          first_name: 'Person B',
          last_name: 'Person B',
        }],
      simplified_debts: [{
        from: 1,
        to: 2,
        amount: 100,
      }],
    });

    request(server)
      .get(`/group?groupId=12345&apiKey=${config.apiKey}`)
      .expect(200)
      .end((err, response) => {
        if (err) {
          assert.fail(err);
        }
        const { groupName, lastUpdated, expenses } = response.body;
        assert.notStrictEqual(groupName, null);
        assert.notStrictEqual(lastUpdated, null);
        assert.notStrictEqual(expenses, null);
        stub.restore();
        return done();
      });
  });

  it('is alive', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, response) => {
        if (err) {
          assert.fail(err);
        }
        const { status } = response.body;
        assert.strictEqual(status, 'UP');
        return done();
      });
  });
});

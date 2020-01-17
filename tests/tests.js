const request = require('supertest');
const assert = require('assert');
require('dotenv').config();

describe('/ tests', () => {
    let server;
    const groupId = process.env.GROUP_ID;

    before(() => {
        server = require('../app').listen(3002);
    });

    after(() => {
        server.close();
    });

    it('/ gives 200', (done) => {
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

    it('/group gives 200', (done) => {
        request(server)
            .get(`/group?groupId=${groupId}`)
            .expect(200)
            .end((err, response) => {
                if (err) {
                    assert.fail(err.message);
                    return done(err);
                }

                assert.notEqual(response.body, null);
                assert.notEqual(response.body.who, null);

                return done();
            });
    });

    it('/group gives 400 when no parameters specified', (done) => {
        request(server)
            .get('/group')
            .expect(400, done);
    });

    it('/group gives 502 when using an incorrect group id', (done) => {
        request(server)
            .get('/?groupId=123456789')
            .expect(502, done);
    });
});

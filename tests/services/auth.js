const assert = require('assert');
const authService = require('../../src/services/auth');

describe('services/auth', () => {
  it('checks api key correctly', async () => {
    const result = authService.apiKeyValid('123');
    assert.strictEqual(result, false);
  });
});

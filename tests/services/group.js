const assert = require('assert');
const sinon = require('sinon');
const splitwiseService = require('../../src/services/splitwise');
const groupService = require('../../src/services/group');

describe('services/group', () => {
  it('returns group information', async () => {
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
    const { groupName, lastUpdated, expenses } = await groupService.getExpenses('12345');
    assert.notStrictEqual(groupName, null);
    assert.notStrictEqual(lastUpdated, null);
    assert.notStrictEqual(expenses, null);
    stub.restore();
  });

  it('handles error', async () => {
    try {
      await groupService.getExpenses('12345');
    } catch (err) {
      const containsMessage = err.message.includes('Using group ID: 12345 gave following error:');
      assert.strictEqual(containsMessage, true);
    }
  });
});

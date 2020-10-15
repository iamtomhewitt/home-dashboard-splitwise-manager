const assert = require('assert');
const sinon = require('sinon');
const splitwiseService = require('../../src/services/splitwise');
const groupService = require('../../src/services/group');

describe('group service', () => {
  let stub;

  beforeEach(() => {
    stub = sinon.stub(splitwiseService, 'getSplitwiseData').returns({
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
  });

  afterEach(() => {
    stub.restore();
  });

  it('returns group information', async () => {
    const { groupName, lastUpdated, expenses } = await groupService.getExpenses('12345');
    assert.notStrictEqual(groupName, null);
    assert.notStrictEqual(lastUpdated, null);
    assert.notStrictEqual(expenses, null);
  });
});

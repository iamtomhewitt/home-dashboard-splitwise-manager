const mock = jest.fn().mockImplementation(() => ({
  getGroup: jest.fn().mockResolvedValue({
    name: 'Test Group',
    updated_at: '2022-09-16T19:41:52.138Z',
    members: [{
      id: 1,
      first_name: 'Person A',
      last_name: 'Person A',
    }, {
      id: 2,
      first_name: 'Person B',
      last_name: 'Person B',
    }],
    simplified_debts: [{
      from: 1,
      to: 2,
      amount: 100,
    }],
  }),
}));

module.exports = mock;

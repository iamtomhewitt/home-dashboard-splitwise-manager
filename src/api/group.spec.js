const { handler } = require('./group');

describe('group', () => {
  it('should get group data', async () => {
    const response = await handler({
      queryStringParameters: {
        groupId: '1234',
      },
    });

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual({
      expenses: [{
        amount: '£100.00',
        owes: 'Person B',
        who: 'Person A',
      }],
      groupName: 'Test Group',
      lastUpdated: '2022-09-16T19:41:52.138Z',
    });
  });

  it('should return bad request when no group specified', async () => {
    const response = await handler({
      queryStringParameters: {},
    });

    expect(response.statusCode).toEqual(400);
    expect(JSON.parse(response.body)).toEqual({
      message: 'Group ID missing from query!',
    });
  });

  it('should return error', async () => {
    const response = await handler({});

    expect(response.statusCode).toEqual(500);
    expect(JSON.parse(response.body).message).not.toBeNull();
  });
});

const Splitwise = require('splitwise');

const { response } = require('../http/response');

module.exports.handler = async (event) => {
  try {
    const { groupId } = event.queryStringParameters;

    if (!groupId) {
      return response.badRequest({ message: 'Group ID missing from query!' });
    }

    console.log('Supplied group id:', groupId);

    const sw = Splitwise({
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
    });

    const data = await sw.getGroup({ id: groupId });
    const expenses = [];
    const {
      members,
      name: groupName,
      simplified_debts: debts,
      updated_at: lastUpdated,
    } = data;

    debts.forEach((debt) => {
      const who = members.find((x) => x.id === debt.from).first_name;
      const owes = members.find((x) => x.id === debt.to).first_name;
      const amount = `£${parseFloat(debt.amount).toFixed(2)}`;
      expenses.push({
        who,
        owes,
        amount,
      });
    });

    const responseData = {
      groupName,
      lastUpdated,
      expenses,
    };

    console.log('Success!', responseData);

    return response.ok(responseData);
  } catch (err) {
    console.error('An error occurred: ', err);
    return response.error({
      message: err.message,
    });
  }
};

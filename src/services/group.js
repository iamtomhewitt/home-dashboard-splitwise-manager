const Splitwise = require('splitwise');
const config = require('../config');

module.exports = {
  getExpenses(groupId) {
    const sw = Splitwise({
      consumerKey: config.consumerKey,
      consumerSecret: config.consumerSecret,
    });

    sw.getGroup({ id: groupId }).then((response) => {
      const { members, name, simplified_debts: debts } = response;
      const expenses = [];

      debts.forEach((debt) => {
        const who = members.find((x) => x.id === debt.from).first_name;
        const owes = members.find((x) => x.id === debt.to).first_name;
        const amount = `£${parseFloat(debt.amount).toFixed(2)}`;
        expenses.push({ who, owes, amount });
      });

      return ({
        groupName: name,
        lastUpdated: response.updated_at,
        expenses,
      });
    }).catch((err) => {
      throw new Error(`Using group ID: ${groupId} gave following error: ${err.message}`);
    });
  }
}
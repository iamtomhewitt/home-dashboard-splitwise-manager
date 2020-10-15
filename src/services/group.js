const splitwiseService = require('./splitwise');

module.exports = {
  async getExpenses(groupId) {
    try {
      const data = await splitwiseService.getSplitwiseData(groupId);
      const {
        members, name: groupName, simplified_debts: debts, updated_at: lastUpdated,
      } = data;
      const expenses = [];

      debts.forEach((debt) => {
        const who = members.find((x) => x.id === debt.from).first_name;
        const owes = members.find((x) => x.id === debt.to).first_name;
        const amount = `£${parseFloat(debt.amount).toFixed(2)}`;
        expenses.push({ who, owes, amount });
      });

      return ({
        groupName,
        lastUpdated,
        expenses,
      });
    } catch (err) {
      throw new Error(`Using group ID: ${groupId} gave following error: ${err.message}`);
    }
  },
};

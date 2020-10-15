const Splitwise = require('splitwise');
const config = require('../config');

module.exports = {
  async getSplitwiseData(groupId) {
    const sw = Splitwise({
      consumerKey: config.consumerKey,
      consumerSecret: config.consumerSecret,
    });

    try {
      const data = await sw.getGroup({ id: groupId });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },
};

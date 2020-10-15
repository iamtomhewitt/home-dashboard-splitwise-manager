const config = require('../config');

module.exports = {
  apiKeyValid(key) {
    return key === config.apiKey;
  },
};

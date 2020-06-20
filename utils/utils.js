const { badRequest, unauthorised } = require('./responses');

module.exports = {
  checkApiKey(apiKey) {
    if (!apiKey) {
      return {
        code: 400,
        response: badRequest('No API key specified'),
      };
    }

    if (apiKey !== process.env.API_KEY) {
      return {
        code: 401,
        response: unauthorised('API key is incorrect'),
      };
    }

    return null;
  },
};

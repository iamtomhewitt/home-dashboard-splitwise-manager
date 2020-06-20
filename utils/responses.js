const { BAD_REQUEST, SERVER_ERROR, UNAUTHORISED } = require('./responseCodes');

module.exports = {
  badRequest(message) {
    return {
      code: BAD_REQUEST,
      message,
    };
  },

  error(message) {
    return {
      code: SERVER_ERROR,
      message,
    };
  },

  unauthorised(message) {
    return {
      code: UNAUTHORISED,
      message,
    };
  },
};

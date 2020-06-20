module.exports = {
  badRequest(message) {
    return {
      code: 400,
      message,
    };
  },

  error(message) {
    return {
      code: 500,
      message,
    };
  },

  unauthorised(message) {
    return {
      code: 401,
      message,
    };
  },

};

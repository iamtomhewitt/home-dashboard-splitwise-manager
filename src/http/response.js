const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const buildResponse = (statusCode, body) => ({
  statusCode,
  headers,
  body: typeof body === 'string' ? body : JSON.stringify(body),
});

const ok = (body) => buildResponse(200, body);

const badRequest = (body) => buildResponse(400, body);

const error = (body) => buildResponse(500, body);

const response = {
  ok,
  badRequest,
  error,
};

module.exports = { response };

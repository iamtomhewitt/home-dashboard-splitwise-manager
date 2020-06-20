const express = require('express');
const Splitwise = require('splitwise');
require('dotenv').config();

const router = express.Router();

const success = 200;
const badRequest = 400;
const unauthorised = 401;
const serverError = 500;

const sw = Splitwise({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
});

function badRequestResponse(message) {
  return {
    status: badRequest,
    message,
  };
}

function errorResponse(message) {
  return {
    status: serverError,
    message,
  };
}

function unauthorisedResponse(message) {
  return {
    status: unauthorised,
    message,
  };
}

function checkApiKey(apiKey) {
  if (!apiKey) {
    return {
      response: badRequestResponse('No API key specified'),
      code: badRequest,
    };
  }

  if (apiKey !== process.env.API_KEY) {
    return {
      response: unauthorisedResponse('API key is incorrect'),
      code: unauthorised,
    };
  }

  return null;
}

router.get('/', (req, res) => {
  const { groupId } = req.query;
  const { apiKey } = req.query;

  const failedCheck = checkApiKey(apiKey);
  if (failedCheck) {
    res.status(failedCheck.code).send(failedCheck.response);
    return;
  }

  if (!groupId) {
    res.status(badRequest).send(badRequestResponse('Group ID missing from query'));
    return;
  }

  sw.getGroup({ id: groupId }).then((response) => {
    const { members } = response;
    const debts = response.simplified_debts;
    const expenses = [];

    debts.forEach((debt) => {
      const who = members.find((x) => x.id === debt.from).first_name;
      const owes = members.find((x) => x.id === debt.to).first_name;
      const amount = `£${parseFloat(debt.amount).toFixed(2)}`;

      expenses.push({ who, owes, amount });
    });

    res.status(success).send({
      groupName: response.name,
      lastUpdated: response.updated_at,
      expenses,
    });
  }).catch((err) => {
    res.status(serverError).send(errorResponse(`Using group ID: ${groupId} gave following error: ${err.message}`));
  });
});

module.exports = router;

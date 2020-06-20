const express = require('express');
const Splitwise = require('splitwise');
const { badRequest, error } = require('../utils/responses');
const { checkApiKey } = require('../utils/utils');
const { SUCCESS, BAD_REQUEST, SERVER_ERROR } = require('../utils/responseCodes');

const router = express.Router();

require('dotenv').config();

const sw = Splitwise({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
});

router.get('/', (req, res) => {
  const { groupId, apiKey } = req.query;

  const failedCheck = checkApiKey(apiKey);
  if (failedCheck) {
    res.status(failedCheck.code).send(failedCheck.response);
    return;
  }

  if (!groupId) {
    res.status(BAD_REQUEST).send(badRequest('Group ID missing from query'));
    return;
  }

  sw.getGroup({ id: groupId }).then((response) => {
    const { members, name } = response;
    const debts = response.simplified_debts;
    const expenses = [];

    debts.forEach((debt) => {
      const who = members.find((x) => x.id === debt.from).first_name;
      const owes = members.find((x) => x.id === debt.to).first_name;
      const amount = `£${parseFloat(debt.amount).toFixed(2)}`;
      expenses.push({ who, owes, amount });
    });

    res.status(SUCCESS).send({
      groupName: name,
      lastUpdated: response.updated_at,
      expenses,
    });
  }).catch((err) => {
    res.status(SERVER_ERROR).send(error(`Using group ID: ${groupId} gave following error: ${err.message}`));
  });
});

module.exports = router;

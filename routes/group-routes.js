const express = require('express');
const Splitwise = require('splitwise');
const { badRequest, error } = require('../utils/responses');
const { checkApiKey } = require('../utils/utils');

const router = express.Router();

require('dotenv').config();

const sw = Splitwise({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
});

router.get('/', (req, res) => {
  const { groupId } = req.query;
  const { apiKey } = req.query;

  const failedCheck = checkApiKey(apiKey);
  if (failedCheck) {
    res.status(failedCheck.code).send(failedCheck.response);
    return;
  }

  if (!groupId) {
    res.status(badRequest).send(badRequest('Group ID missing from query'));
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

    res.status(200).send({
      groupName: response.name,
      lastUpdated: response.updated_at,
      expenses,
    });
  }).catch((err) => {
    res.status(500).send(error(`Using group ID: ${groupId} gave following error: ${err.message}`));
  });
});

module.exports = router;

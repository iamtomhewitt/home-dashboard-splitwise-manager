const express = require('express');
const auth = require('../services/auth');

const route = express.Router();
const service = require('../services/group');

route.get('/', async (req, res) => {
  const { groupId, apiKey } = req.query;

  if (!auth.apiKeyValid(apiKey)) {
    return res.status(401).json({ message: 'API key is invalid!' });
  }

  if (!groupId) {
    return res.status(400).json({ message: 'Group ID missing from query!' });
  }

  const { groupName, lastUpdated, expenses } = await service.getExpenses(groupId);
  return res.json({ groupName, lastUpdated, expenses });
});

module.exports = route;

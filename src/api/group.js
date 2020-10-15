const express = require('express');
const route = express.Router();
const service = require('../services/group');
const auth = require('../services/auth')

route.get('/', (req, res) => {
  const { groupId, apiKey } = req.query;

  if (!auth.apiKeyValid(apiKey)) {
    return res.status(401).json({ 'message': 'API key is invalid!' });
  }

  if (!groupId) {
    res.status(400).json({ 'message': 'Group ID missing from query!' });
    return;
  }

  const { groupName, lastUpdated, expenses } = service.getExpenses(groupId);

  return res.json({ groupName, lastUpdated, expenses });
});

module.exports = route;

const express = require('express');
const bodyParser = require('body-parser');

const listEndpoints = require('express-list-endpoints');

const app = express();
const groupRoutes = require('./routes/group-routes');
const { version } = require('./package.json');

const port = 3001;
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/group', groupRoutes);

app.get('/', (req, res) => {
  res.status(200).send({ status: '💰 SERVER OK', version, endpoints: listEndpoints(app) });
});

app.listen(process.env.PORT || port, () => { });

module.exports = app;

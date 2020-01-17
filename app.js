const express = require('express');
const bodyParser = require('body-parser');
const listEndpoints = require('express-list-endpoints');
const Splitwise = require('splitwise');
const { version } = require('./package.json');
require('dotenv').config();

const app = express();
const groupRoutes = require('./routes/group-routes');

const successCode = 200;
const clientErrorCode = 400;
const errorCode = 502;

const groupId = process.env.GROUP_ID;

const sw = Splitwise({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/group', groupRoutes);

app.get('/', (req, res) => {
    res.status(successCode).send({ status: '💰 SERVER OK', version, endpoints: listEndpoints(app) });
});

const port = 3001;
app.listen(process.env.PORT || port, () => { });

module.exports = app;

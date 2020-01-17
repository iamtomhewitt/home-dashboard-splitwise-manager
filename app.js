const express = require('express');
const bodyParser = require('body-parser');
const listEndpoints = require('express-list-endpoints');
const { version } = require('./package.json');
require('dotenv').config();

const app = express();
const groupRoutes = require('./routes/group-routes');

const successCode = 200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/group', groupRoutes);

app.get('/', (req, res) => {
    res.status(successCode).send({ status: '💰 SERVER OK', version, endpoints: listEndpoints(app) });
});

const port = 3001;
app.listen(process.env.PORT || port, () => { });

module.exports = app;

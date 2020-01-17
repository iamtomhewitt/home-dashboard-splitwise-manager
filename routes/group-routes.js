const express = require('express');
require('dotenv').config();

const router = express.Router();

const successCode = 200;
const clientErrorCode = 400;
const errorCode = 502;

const sw = Splitwise({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
});

function success(message) {
    return {
        status: successCode,
        message,
    };
}

function clientError(message) {
    return {
        status: clientErrorCode,
        message,
    };
}

function error(message) {
    return {
        status: errorCode,
        message,
    };
}

router.get('/', (req, res) => {
	const {groupId} = req.query;
	
});

module.exports = router;

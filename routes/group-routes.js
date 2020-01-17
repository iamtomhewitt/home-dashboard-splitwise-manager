const express = require('express');
const Splitwise = require('splitwise');
require('dotenv').config();

const router = express.Router();

const successCode = 200;
const clientErrorCode = 400;
const errorCode = 502;

const sw = Splitwise({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
});

function success(expenses) {
    return {
        status: successCode,
        expenses,
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
    const { groupId } = req.query;

    if (!groupId) {
        res.status(clientErrorCode).send(clientError('Group ID missing from query'));
        return;
    }

    sw.getGroup({ id: groupId }).then((response) => {
        const members = response.members;
        const debts = response.simplified_debts;
        const expenses = [];

        debts.forEach((debt) => {
            const who = members.find((x) => x.id === debt.from).first_name;
            const owes = members.find((x) => x.id === debt.to).first_name;
            const amount = `£${debt.amount}`;

            expenses.push({ who, owes, amount });
        });


        res.status(successCode).send({
            groupName: response.name,
            lastUpdated: response.updated_at,
            expenses,
        });
    });
});

module.exports = router;

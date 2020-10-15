const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
};
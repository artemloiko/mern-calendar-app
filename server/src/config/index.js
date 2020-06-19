const dotenv = require('dotenv');
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  port: process.env.PORT || '8080',
};

module.exports = config;

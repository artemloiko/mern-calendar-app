const dotenv = require('dotenv');
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  port: process.env.PORT || '8080',
  nodeEnv: process.env.NODE_ENV || 'development',
  dbName: process.env.DB_NAME || 'users',
  dbHost: process.env.DB_HOST,
  dbPwd: process.env.DB_PWD,
  dbUser: process.env.DB_USER,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;

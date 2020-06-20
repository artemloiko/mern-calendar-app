const mongoose = require('mongoose');
const config = require('../config');
const User = require('./user.model');

mongoose.Promise = global.Promise;

const db = { User };

db.init = () => {
  const { dbUser, dbPwd, dbHost, dbName } = config;
  return mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPwd}@${dbHost}/${dbName}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connect to MongoDB.');
      db.connection = mongoose.connection;
    })
    .catch((err) => {
      console.log('Cannon connect to MongoDB!', err.message);
      process.exit();
    });
};

module.exports = db;

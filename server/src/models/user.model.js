const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  start: Number,
  duration: Number,
  title: String,
});

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  events: [eventSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

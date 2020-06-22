const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { isValidDuration } = require('../validations/events.validation');
const HttpError = require('../utils/httpError');
const db = require('../models');
const config = require('../config');

const User = db.User;
const JWT_TOKEN_EXP = 86400; // 24 hours

class UserService {
  getJwtToken(id) {
    return jwt.sign({ id }, config.jwtSecret, {
      expiresIn: JWT_TOKEN_EXP,
    });
  }

  async signUp(signUpDTO) {
    const { username, email, password } = signUpDTO;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    }).exec();

    if (existingUser) {
      const errorMessage =
        existingUser.email === email ? 'Email is already in use!' : 'Username is already in use!';
      throw new HttpError(errorMessage, 400);
    }

    const user = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });

    const savedUser = await user.save();

    return {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      accessToken: this.getJwtToken(savedUser._id),
    };
  }

  async signIn(signInDTO) {
    const { login, password } = signInDTO;

    const user = await User.findOne({ $or: [{ username: login }, { email: login }] }).exec();
    const passwordIsValid = user ? bcrypt.compareSync(password, user.password) : false;

    if (!user || !passwordIsValid) throw new HttpError('Password or login are wrong!', 401);

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: this.getJwtToken(user._id),
    };
  }

  async getUserEvents(id) {
    const user = await User.findById(id).exec();
    return user.events.sort((eventA, eventB) => eventA.start - eventB.start);
  }

  async addUserEvent(id, eventDTO) {
    if (!isValidDuration(eventDTO)) throw new HttpError('The event cannot end after 5 pm.', 422);
    const user = await User.findById(id).exec();
    user.events.push(eventDTO);
    await user.save();
    return user.events[user.events.length - 1];
  }

  async deleteUserEvent(id, eventId) {
    const user = await User.findById(id).exec();
    const event = user.events.id(eventId);
    if (!event) throw new HttpError('Cannot find event!', 404);
    event.remove();
    await user.save();
  }
}

const userService = new UserService();

module.exports = {
  userService,
};

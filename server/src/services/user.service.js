const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      accessToken: this.getJwtToken(savedUser._id),
    };
  }

  async signIn(signInDTO) {
    const { login, password } = signInDTO;

    const user = await User.findOne({ $or: [{ username: login }, { email: login }] }).exec();
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!user || !passwordIsValid) throw new HttpError('Password or login are wrong!', 401);

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: this.getJwtToken(user._id),
    };
  }
}

const userService = new UserService();

module.exports = {
  userService,
};

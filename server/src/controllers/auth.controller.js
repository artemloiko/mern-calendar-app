const { userService } = require('../services/user.service');

const signup = async (req, res, next) => {
  try {
    const user = await userService.signUp(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const user = await userService.signIn(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
};

const Joi = require('@hapi/joi');

const signup = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(256).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const signin = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  signup,
  signin,
};

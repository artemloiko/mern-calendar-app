const Joi = require('@hapi/joi');
const HttpError = require('../utils/httpError');

const validateBody = (schema) => (req, res, next) => {
  const { body } = req;
  const { value, error } = Joi.compile(schema).validate(body);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new HttpError(errorMessage, 422));
  }
  req.body = value;
  return next();
};

module.exports = validateBody;

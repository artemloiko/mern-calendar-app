const Joi = require('@hapi/joi');

function isValidDuration(eventDTO) {
  const { start, duration } = eventDTO;

  return start + duration <= 540;
}

const event = Joi.object({
  start: Joi.number().min(0).max(539).required(),
  duration: Joi.number().min(1).max(540).required(),
  title: Joi.string().required(),
});

module.exports = {
  event,
  isValidDuration,
};

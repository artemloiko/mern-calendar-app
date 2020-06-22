const { userService } = require('../services/user.service');

const getEvents = async (req, res, next) => {
  try {
    const events = await userService.getUserEvents(req.userId);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const addEvent = async (req, res, next) => {
  try {
    const eventDTO = req.body;
    const event = await userService.addUserEvent(req.userId, eventDTO);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    await userService.deleteUserEvent(req.userId, eventId);
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEvents,
  addEvent,
  deleteEvent,
};

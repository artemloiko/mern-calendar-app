const express = require('express');
const controller = require('../../controllers/events.controller.js');
const validateBody = require('../../middlewares/validateBody');
const { eventsValidation } = require('../../validations');

const router = express.Router();

router.get('/', controller.getEvents);
router.post('/', validateBody(eventsValidation.event), controller.addEvent);
router.delete('/:eventId', controller.deleteEvent);

module.exports = router;

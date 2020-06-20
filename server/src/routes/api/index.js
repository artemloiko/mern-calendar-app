const express = require('express');
const authRoutes = require('./auth.routes');
const eventsRoutes = require('./events.routes');
const jwtAuth = require('../../middlewares/jwtAuth');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/events', jwtAuth, eventsRoutes);

module.exports = router;

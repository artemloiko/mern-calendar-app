const express = require('express');
const controller = require('../../controllers/auth.controller.js');
const validateBody = require('../../middlewares/validateBody');
const { authValidation } = require('../../validations');

const router = express.Router();

router.post('/signup', validateBody(authValidation.signup), controller.signup);
router.post('/signin', validateBody(authValidation.signin), controller.signin);

module.exports = router;

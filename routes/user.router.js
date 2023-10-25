const express = require('express');

const controllers = require('./controllers/user.controller.js');

const router = express.Router();

router.get('/users', controllers.getUsers);
router.get('/users/:id', controllers.getUser);

module.exports = router; 
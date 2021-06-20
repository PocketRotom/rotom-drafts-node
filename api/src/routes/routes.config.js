const express = require("express");
const router = express.Router();
const users = require('./user');
const leagues = require('./league');

router.use('/users', users);
router.use('/leagues', leagues);

module.exports = router;
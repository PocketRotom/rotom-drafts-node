const express = require("express");
const router = express.Router();
const users = require('./user');
const leagues = require('./league');
const auth = require('./auth');
  

router.use('/users', users);
router.use('/leagues', leagues);
router.use('/auth', auth);

module.exports = router;
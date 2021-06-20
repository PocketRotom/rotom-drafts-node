const express = require("express");
const router = express.Router();
const users = require("../controllers/user.js");

router.get('', users.findAll);

router.get('/:userID', users.findUserByID);

router.get('/user/:username', users.findUserByUsername)

module.exports = router;
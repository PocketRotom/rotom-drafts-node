const express = require("express");
const router = express.Router();
const users = require("../controllers/user.js");

// base_url/users
router.get('', users.findAll);

// base_url/users/id
router.get('/:userID', users.findUserByID);

// base_url/users/username
router.get('/user/:username', users.findUserByUsername)

module.exports = router;
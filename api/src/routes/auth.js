const express = require("express");
const router = express.Router({mergeParams: true});
const auth = require("../controllers/auth.js");

// base_url/auth/signup
router.get('/signup', auth.signup);

// base_url/auth/login
router.get('/login', auth.login);


module.exports = router;
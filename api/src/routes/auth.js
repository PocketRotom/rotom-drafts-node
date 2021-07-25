const express = require("express");
const router = express.Router({mergeParams: true});
const auth = require("../controllers/auth.js");

// base_url/auth/signup
router.post('/signup', auth.signup);

// base_url/auth/login
router.post('/login', auth.login);

// base_url/auth/verify
router.post('/verify', auth.verify);


module.exports = router;
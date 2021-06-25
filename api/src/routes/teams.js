const express = require("express");
const router = express.Router({mergeParams: true});
const teams = require("../controllers/teams.js");

// base_url/leagues/leagueID/divisions/
router.post('/signup', teams.signUpTeam);



module.exports = router;
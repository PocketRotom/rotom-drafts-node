const express = require("express");
const router = express.Router({mergeParams: true});
const teams = require("../controllers/teams.js");

// base_url/leagues/leagueID/divisions/
router.post('/signup', teams.signUpTeam);

// base_url/leagues/id/teams
router.get('', teams.getAllTeams);



module.exports = router;
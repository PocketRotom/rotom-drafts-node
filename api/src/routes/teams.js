const express = require("express");
const router = express.Router({mergeParams: true});
const teams = require("../controllers/teams.js");
const add = require("./add");

// base_url/leagues/leagueID/divisions/
router.post('/signup', teams.signUpTeam);

// base_url/leagues/id/teams
router.get('', teams.getAllTeams);

// base_url/leagues/leagueID/teams/teamID/draft
router.get('/:teamID/draft', teams.getTeamDraft);

// base_url/leagues/leagueID/teams/teamID
router.get('/:teamID', teams.getTeam);


// base_url/leagues/leagueID/teams/teamID/add/pokemonID
router.use('/:teamID/add', add);



module.exports = router;
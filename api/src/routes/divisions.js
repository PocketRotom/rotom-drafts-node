const express = require("express");
const router = express.Router({mergeParams: true});
const divisions = require("../controllers/divisions.js");

// base_url/leagues/leagueID/divisions/
router.get('', divisions.findAll);

// base_url/leagues/leagueID/divisions/noDivision
router.get('/noDivision', divisions.getTeamsWithNoDivision);

// base_url/leagues/leagueID/divisions/divisionID
router.get('/:divisionID', divisions.getTeams);

// base_url/leagues/leagueID/divisions/
router.post('', divisions.createDivision);

module.exports = router;
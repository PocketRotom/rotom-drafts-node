const express = require("express");
const router = express.Router();
const leagues = require("../controllers/league.js");
const divisions = require("./divisions");
const teams = require("./teams");

// base_url/leagues
router.get('', leagues.findAll);

// base_url/leagues/id
router.get('/:leagueID', leagues.findLeagueByID);

// base_url/leagues/id/admins
router.get('/:leagueID/admins', leagues.getAdmins);

// base_url/leagues/id/admins
router.post('/:leagueID/admins', leagues.addAdmin);

// base_url/leagues
router.post('', leagues.createLeague);



router.use('/:leagueID/teams', teams);

router.use('/:leagueID/divisions', divisions);


module.exports = router;
const express = require("express");
const router = express.Router();
const leagues = require("../controllers/league.js");
const divisions = require("./divisions");
const teams = require("./teams");
const matches = require("./matches");
const tierlist = require("./tierlist");

// base_url/leagues
router.get('', leagues.findAll);

// base_url/leagues/id
router.get('/:leagueID', leagues.findLeagueByID);

// base_url/leagues/id/admins
router.get('/:leagueID/admins', leagues.getAdmins);

// base_url/leagues/id/admins
router.post('/:leagueID/admins', leagues.addAdmin);

// base_url/leagues/id/nonAdmins
router.get('/:leagueID/nonAdmins', leagues.nonAdmins);

// base_url/leagues/id/signups
router.put('/:leagueID/signups', leagues.updateSignups);

// base_url/leagues/id/alreaduSignedUp
router.post('/:leagueID/alreadySignedUp', leagues.alreadySignedUp);

// base_url/leagues/id/update
router.put('/:leagueID/update', leagues.update);

// base_url/leagues
router.post('', leagues.createLeague);



router.use('/:leagueID/teams', teams);

router.use('/:leagueID/divisions', divisions);

router.use('/:leagueID/matches', matches);

router.use('/:leagueID/tierlist', tierlist);


module.exports = router;
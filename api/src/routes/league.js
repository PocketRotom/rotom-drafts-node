const express = require("express");
const router = express.Router();
const leagues = require("../controllers/league.js");
const divisions = require("./divisions");

// base_url/leagues
router.get('', leagues.findAll);

// base_url/leagues/id
router.get('/:leagueID', leagues.findLeagueByID);

// base_url/leagues
router.post('', leagues.createLeague);


router.use('/divisions', divisions);

module.exports = router;
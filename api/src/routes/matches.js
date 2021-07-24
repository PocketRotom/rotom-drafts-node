const express = require("express");
const router = express.Router({mergeParams: true});
const matches = require("../controllers/matches.js");

// base_url/leagues/leagueID/matches/
router.get('', matches.findAll);
router.post('', matches.addMatch);

// base_url/leagues/leagueID/matches/matchID
router.get('/:matchID', matches.getMatch);
router.put('/:matchID', matches.updateMatch);



module.exports = router;
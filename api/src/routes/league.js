const express = require("express");
const router = express.Router();
const leagues = require("../controllers/league.js");

router.get('', leagues.findAll);

router.get('/:leagueID', leagues.findUserByID);

module.exports = router;
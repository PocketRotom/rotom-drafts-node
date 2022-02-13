const express = require("express");
const router = express.Router();
const users = require('./user');
const leagues = require('./league');
const auth = require('./auth');
const uploadTeams = require('./uploadTeams');
const uploadLeagues = require('./uploadLeagues.js');
const teams = require("../controllers/teams.js");

router.use('/users', users);
router.use('/leagues', leagues);
router.use('/auth', auth);

router.use('/upload/teams', uploadTeams);
router.use('/upload/leagues', uploadLeagues);

router.put('/addPokemon', teams.addPokemon);


module.exports = router;
const express = require("express");
const router = express.Router({mergeParams: true});
const teams = require("../controllers/teams.js");

// base_url/leagues/leagueID/teams/teamID/add/pokemonID
router.get('/:pokemonID', teams.addPokemon);




module.exports = router;
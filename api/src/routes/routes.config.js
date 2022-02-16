const express = require("express");
const router = express.Router();
const teams = require("../controllers/teams.js");
const pokemon = require("../controllers/pokemon.js");

router.get('/allTeams', teams.getAllTeams);

router.get('/team', teams.getTeam);

router.get('/teamDraft', teams.getTeamDraft);

router.get('/drafted', teams.getDrafted);

router.get('/pokemons', pokemon.getPokemons);

router.get('/pokemon/byTier', pokemon.getPokemonByTier);

router.post('/draft', pokemon.draft);

router.put('/pokemon/ban', pokemon.ban);

router.get('/pokemon/isFree', pokemon.isFree);

router.put('/pokemon/setTier', pokemon.setTier);

module.exports = router;
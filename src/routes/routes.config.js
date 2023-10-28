const express = require("express");
const router = express.Router();
const teams = require("../controllers/teams.js");
const pokemon = require("../controllers/pokemon.js");
const general = require("../controllers/general.js");

router.get("/allTeams", teams.getAllTeams);

router.get("/team", teams.getTeam);

router.put("/team/teraType", teams.draftTera);

router.get("/teamDraft", teams.getTeamDraft);

router.get("/drafted", teams.getDrafted);

router.get("/draftedOrdered", teams.getDraftedOrdered);

router.get("/draftedByID", teams.getDraftedByID);

router.get("/pokemons", pokemon.getPokemons);

router.get("/pokemon/byTier", pokemon.getPokemonByTier);

router.post("/draft", pokemon.draft);

router.post("/draftByTier", pokemon.draftByTier);

router.post("/pokemon/add", pokemon.addPokemon);

router.put("/pokemon/ban", pokemon.ban);

router.get("/pokemon/isFree", pokemon.isFree);

router.put("/pokemon/setTier", pokemon.setTier);

router.put("/doReset", teams.doReset);

router.get("/pokemon", pokemon.getPokemon);

router.get("/getCurrentPick", general.getCurrentPick);

router.put("/setCurrentPick", general.setCurrentPick);

router.get("/lgaPokemon", pokemon.getLgaPokemon);

module.exports = router;

const Pokemon = require("../models/pokemon.js");

module.exports = {
    getPokemons: async (req, res) => {
        try {
            //let leagueID = req.query.leagueID;

            let pokemons = await Pokemon.getPokemons();
            return res.status(200).json({
                success: true,
                count: pokemons.length,
                data: pokemons
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    getPokemonByTier: async (req, res) => {
        try {
            let tier = req.query.tier;

            let pokemons = await Pokemon.getPokemonByTier(tier);
            return res.status(200).json({
                success: true,
                count: pokemons.length,
                data: pokemons
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    draft: async (req, res) => {
        try {
            let teamID = req.query.teamID;
            //let teamID = 27;
            let pokemonID = req.query.pokemonID;

            let pokemon = await Pokemon.draft(teamID, pokemonID);
            return res.status(200).json({
                success: true,
                //count: teams.length,
                data: pokemon
            });
        } catch (error) {
            if (error.code = "ER_DUP_ENTRY"){
                return res.status(500).json({
                    success: false,
                    error: "Pokémon Already drafted"
                })
            }
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    ban: async (req, res) => {
        try {
            //let teamID = req.body.teamID;
            //let teamID = 27;
            let pokemonID = req.query.pokemonID;
            let teamID = req.query.teamID;

            let {pokemon, team} = await Pokemon.ban(pokemonID, teamID);
            return res.status(200).json({
                success: true,
                //count: teams.length,
                data: [pokemon, team]
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    isFree: async (req, res) => {
        try {
            let pokemonID = req.query.pokemonID;

            let pokemons = await Pokemon.isFree(pokemonID);
            return res.status(200).json({
                success: true,
                count: pokemons.length,
                data: pokemons
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    setTier: async (req, res) => {
        try {
            let pokemonID = req.query.pokemonID;
            let tier = req.query.tier;

            let pokemon = await Pokemon.setTier(pokemonID, tier);
            return res.status(200).json({
                success: true,
                //count: teams.length,
                data: pokemon
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
}
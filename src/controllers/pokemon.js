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
            let pokemonID = req.query.pokemonID;
            let draftNo = req.query.draftNo;
            let tier = req.query.tier;

            let pokemon = await Pokemon.draft(teamID, pokemonID, draftNo, tier);
            return res.status(200).json({
                success: true,
                //count: teams.length,
                data: pokemon
            });
        } catch (error) {
            if (error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({
                    success: false,
                    error: "Pokémon Already drafted this draft or you drafted it already... Or I f***ed up"
                })
            }
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    draftByTier: async (req, res) => {
        try {
            let teamID = req.query.teamID;
            let pokemonID = req.query.pokemonID;
            let draftNo = req.query.draftNo;
            let tier = req.query.tier;

            let pokemon = await Pokemon.draftByTier(teamID, pokemonID, draftNo, tier);
            return res.status(200).json({
                success: true,
                //count: teams.length,
                data: pokemon
            });
        } catch (error) {
            if (error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({
                    success: false,
                    error: "Pokémon Already drafted this draft or you drafted it already... Or I f***ed up"
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

            let { pokemon, team } = await Pokemon.ban(pokemonID, teamID);
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
            let draftNo = req.query.draftNo;

            let pokemons = await Pokemon.isFree(pokemonID, draftNo);
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
    getPokemon: async (req, res) => {
        try {
            let pokemonID = req.query.pokemonID;

            let pokemons = await Pokemon.getPokemon(pokemonID);
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
    addPokemon: async (req, res) => {
        try {
            let name = req.query.name;
            let type1 = req.query.type1;
            let type2 = req.query.type2;
            let hp = req.query.hp;
            let attack = req.query.attack;
            let defense = req.query.defense;
            let spAttack = req.query.spAttack;
            let spDefense = req.query.spDefense;
            let speed = req.query.speed;
            let tier = req.query.tier;

            let pokemon = await Pokemon.addPokemon(name, type1, type2, hp, attack, defense, spAttack, spDefense, speed, tier);
            return res.status(200).json({
                success: true,
                //count: teams.length,
                data: pokemon
            });
        } catch (error) {
            console.log(error);
            if (error.code == "ER_DUP_ENTRY") {
                return res.status(500).json({
                    success: false,
                    error: "Pokémon already in the list"
                })
            }
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },

    getLgaPokemon: async (req, res) => {
        try {

            let pokemons = await Pokemon.getLgaPokemon();
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
}
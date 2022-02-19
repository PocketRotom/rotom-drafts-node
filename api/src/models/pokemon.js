const { connectDatabase } = require('../utils/database');

async function getPokemons() {
    const knex = await connectDatabase();

    let teams = await knex("pokemon").select("*");

    knex.destroy();

    return teams;
}

async function getPokemonByTier(tier){
    const knex = await connectDatabase();

    let teams = await knex("pokemon").select("*").where({
        tier: tier
    });

    knex.destroy();

    return teams;
}

async function draft(teamID, pokemonID){
    const knex = await connectDatabase();

    let pokemon = await knex("teamdraft").insert({idTeam: teamID, idPokemon: pokemonID});

    knex.destroy();

    return pokemon;
}

async function ban(pokemonID, teamID){
    const knex = await connectDatabase();

    let pokemon = await knex("pokemon")
    .where({idPokemon: pokemonID})
    .update({
        tier: "BAN"
    })

    let team = await knex("team")
    .where({idTeam: teamID})
    .update({
        ban: pokemonID
    })

    knex.destroy();

    return {pokemon, team};
}

async function setTier(pokemonID, tier){
    const knex = await connectDatabase();

    let pokemon = await knex("pokemon")
    .where({idPokemon: pokemonID})
    .update({
        tier: tier
    })

    knex.destroy();

    return pokemon;
}

async function isFree(pokemonID){
    const knex = await connectDatabase();

    let pokemons = await knex("pokemon").select("tier").where({
        idPokemon: pokemonID
    });
    if (pokemons[0].tier == "ban"){
        return {status: "Banned", tier: pokemons[0].tier};
    }

    let draft = await knex("teamdraft").select("*").where({
        idPokemon: pokemonID
    });

    console.log(draft);

    if (draft.length == 0){
        return {status: "Not Picked", tier: pokemons[0].tier};
    }

    knex.destroy();

    return {status: "Picked", tier: pokemons[0].tier};

}



module.exports = { getPokemons, getPokemonByTier, draft, ban, isFree, setTier };
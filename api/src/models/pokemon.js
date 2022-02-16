const { connectDatabase } = require('../utils/database');

async function getPokemons() {
    const knex = await connectDatabase();

    let teams = knex("pokemon").select("*");

    return teams;
}

async function getPokemonByTier(tier){
    const knex = await connectDatabase();

    let teams = knex("pokemon").select("*").where({
        tier: tier
    });

    return teams;
}

async function draft(teamID, pokemonID){
    const knex = await connectDatabase();

    let pokemon = knex("teamdraft").insert({idTeam: teamID, idPokemon: pokemonID});

    return pokemon;
}

async function ban(pokemonID){
    const knex = await connectDatabase();

    let pokemon = knex("pokemon")
    .where({idPokemon: pokemonID})
    .update({
        tier: "BAN"
    })

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

    return {status: "Picked", tier: pokemons[0].tier};

}



module.exports = { getPokemons, getPokemonByTier, draft, ban, isFree };
const { connectDatabase } = require('../utils/database');

async function getTeams() {
    const knex = await connectDatabase();

    let teams = knex("team").select("*");

    return teams;
}

async function getTeamDraft(teamID) {
    const knex = await connectDatabase();
    
    let draft = knex("teamdraft").select("*").where({
        idTeam: teamID
    });

    return draft;
}


async function getTeam(teamID) {
    const knex = await connectDatabase();
    
    let team = knex("team").select("*").where({
        idTeam: teamID
    });

    return team;
}

async function addPokemon(teamID, pokemonID){
    const knex = await connectDatabase();

    let pokemon = knex("teamdraft").insert({idTeam: teamID, idPokemon: pokemonID});

    return pokemon;
}

async function getDrafted(){
    const knex = await connectDatabase();

    let team = knex("teamdraft")
    .select("teamdraft.idTeam", "teamdraft.idPokemon", "team.teamName", "team.coachName", "team.roleID", "pokemon.name", "pokemon.tier")
    .leftJoin('team', 'teamdraft.idTeam', 'team.idTeam')
    .leftJoin('pokemon', 'teamdraft.idPokemon', 'pokemon.idPokemon');

    return team;
}


module.exports = {getTeams, getTeamDraft, getTeam, addPokemon, getDrafted };
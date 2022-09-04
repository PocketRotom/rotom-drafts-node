const { connectDatabase } = require('../utils/database');

async function getTeams() {
    const knex = await connectDatabase();

    let teams = await knex("team").select("*");

    knex.destroy();
    return teams;
}

async function getTeamDraft(teamID) {
    const knex = await connectDatabase();

    let draft = await knex("teamdraft").select("*").where({
        idTeam: teamID
    });

    let points = await knex("team").select("points").where({
        idTeam: teamID
    });

    let teamsNo = [];
    let teams = {"availablePoints": points[0].points, teams: []};

    draft.forEach(pokemon => {
        if (!teamsNo.includes(pokemon.draftNo)) {
            teamsNo.push(pokemon.draftNo);
        }
    });

    teamsNo.forEach(teamNo => {
        let team = {"teamNo": teamNo, "team": []}
        draft.forEach(pokemon => {
            if (teamNo == pokemon.draftNo) {
                team.team.push(pokemon);
            }
        });
        teams.teams.push(team);
    });

    knex.destroy();
    return teams;
}


async function getTeam(teamID) {
    const knex = await connectDatabase();

    let team = await knex("team").select("*").where({
        idTeam: teamID
    });

    knex.destroy();
    return team;
}

async function doReset() {
    const knex = await connectDatabase();

    let team = await knex("team").update({points: 100})

    knex.destroy();
    return team;
}

async function addPokemon(teamID, pokemonID) {
    const knex = await connectDatabase();

    let pokemon = await knex("teamdraft").insert({ idTeam: teamID, idPokemon: pokemonID });

    knex.destroy();
    return pokemon;
}

async function getDrafted() {
    const knex = await connectDatabase();

    let team = await knex("teamdraft")
        .select("teamdraft.pickNo", "teamdraft.idTeam", "teamdraft.idPokemon", "teamdraft.draftNo", "team.teamName", "team.coachName", "team.roleID", "pokemon.name", "pokemon.tier")
        .leftJoin('team', 'teamdraft.idTeam', 'team.idTeam')
        .leftJoin('pokemon', 'teamdraft.idPokemon', 'pokemon.idPokemon');

    knex.destroy();
    return team;
}


module.exports = { getTeams, getTeamDraft, getTeam, addPokemon, getDrafted, doReset };
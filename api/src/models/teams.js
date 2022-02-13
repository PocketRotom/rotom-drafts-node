const { connectDatabase } = require('../utils/database');

async function signUpTeam(teamName, userID, leagueID) {

    const knex = await connectDatabase();

    let signedUpPlayers = await knex("team").count("*", { as: 'signedUpPlayers' }).where({
        idLeague: leagueID
    });

    signedUpPlayers = signedUpPlayers[0].signedUpPlayers;

    let league = await knex("league").select("maxNumberOfCoaches", "signUpsOpen").where({
        idLeague: leagueID
    });

    let maxPlayers = league[0].maxNumberOfCoaches;

    let signUpsOpen = league[0].signUpsOpen;

    if (signedUpPlayers >= maxPlayers || signUpsOpen == 0) {
        throw 'This league has already reached the max number of PLayers or has closed the signups!';
    }

    let teamAlreadyExists = await knex("team").select("*").where({
        idLeague: leagueID,
        coachID: userID
    });

    if (teamAlreadyExists[0]) {
        throw "You've already signed up for this league";
    }

    //Close Signups if reaches max Players
    if (signedUpPlayers >= maxPlayers) {
        knex('league').where('idLeague', '=', leagueID).update({
                signUpsOpen: 0,
        });
    }


    const result = knex('team').insert({ teamName: teamName, coachID: userID, idLeague: leagueID });

    //TODO Images upload

    return result;
}

async function getTeams(leagueID) {
    const knex = await connectDatabase();

    let teams = knex("team").select("*").where({
        idLeague: leagueID
    });

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


module.exports = { signUpTeam, getTeams, getTeamDraft, getTeam, addPokemon };
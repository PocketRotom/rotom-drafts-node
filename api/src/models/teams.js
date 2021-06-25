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


module.exports = { signUpTeam };
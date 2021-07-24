const { connectDatabase } = require('../utils/database');

async function getAll(leagueID) {

    const knex = await connectDatabase();

    /*let matches = await knex.select("*").from("matches").where({
        idLeague: leagueID
    });*/

    let matches = await knex("matches").select("matches.*", "t1.teamName AS team1Name", "t2.teamName AS team2Name")
    .leftJoin("team AS t1", "matches.idTeam1", "t1.idTeam")
    .leftJoin("team AS t2", "matches.idTeam2", "t2.idTeam");

    matches.sort((a, b) => (a.week > b.week) ? 1 : -1 );


    return matches;

}

async function addMatch(leagueID, team1, team2, week, stream) {
    if (team1 == team2) {
        throw "The 2 teams must be different";
    }

    const knex = await connectDatabase();

    let match = knex("matches").insert({idTeam1: team1, idTeam2: team2, week: week, stream: stream, idLeague: leagueID});

    return match;
}

async function getMatch(matchID) {
    const knex = await connectDatabase();

    // SELECT matches.*, t1.teamName team1Name, t2.teamName as team2Name
    // FROM drafts.matches
    // LEFT JOIN team as t1 ON matches.idTeam1=t1.idTeam
    // LEFT JOIN team as t2 ON matches.idTeam2=t2.idTeam
    // WHERE idMatch = $matchID;

    let match = knex("matches").select("matches.*", "t1.teamName AS team1Name", "t2.teamName AS team2Name")
    .leftJoin("team AS t1", "matches.idTeam1", "t1.idTeam")
    .leftJoin("team AS t2", "matches.idTeam2", "t2.idTeam")
    .where({
        idMatch: matchID
    })

    return match;
}

async function updateMatch(matchID, team1Score, team2Score, replay) {
    const knex = await connectDatabase();

    let match = knex("matches").update({
        scoreTeam1: team1Score,
        scoreTeam2: team2Score,
        replay: replay
    }).where({
        idMatch: matchID
    });

    return match;
}




module.exports = { getAll, addMatch, getMatch, updateMatch};
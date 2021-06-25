const { connectDatabase } = require('../utils/database');

async function getAll(leagueID) {

    const knex = await connectDatabase();

    let divisions = knex.select("*").from("division").where({
        idLeague: leagueID
    });
    return divisions;

}

async function getTeamsByDivision(divisionID) {
    const knex = await connectDatabase();

    let teams = await knex.raw(`SELECT *, wins * 3 AS points FROM team WHERE idDivision = ${divisionID};`);
    teams = teams[0];

    teams.sort((a, b) => (a.points < b.points) ? 1 : (a.points === b.points) ? ((a.differential < b.differential) ? 1 : -1) : -1 )
    return teams;
}

async function getTeamsWithNoDivision(leagueID) {
    const knex = await connectDatabase();

    let teams = await knex.select("*").from("team").whereNull("idDivision").andWhere({
        idLeague: leagueID
    });

    return teams;

}


module.exports = { getAll, getTeamsByDivision, getTeamsWithNoDivision };
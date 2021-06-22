const { connectDatabase } = require('../utils/database');

async function getAll(leagueID) {

    const knex = await connectDatabase();

    let divisions = knex.select("*").from("division").where({
        idLeague: leagueID
    });

    return divisions;

}


module.exports = { getAll };
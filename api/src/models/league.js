const { connectDatabase } = require('../utils/database');

async function getAll() {

    const knex = await connectDatabase();

    let subquery = knex.select("idLeague").count("* as playersCount").from("team").groupBy("idLeague");


    let leagues = knex.select("league.*", "s.playersCount").from("league").leftJoin({ s: subquery }, "league.idLeague", "s.idLeague");
    
    return leagues;
}

async function getByID(id) {
    const knex = await connectDatabase();
    let user = knex.select("*").from('league').where({
        idLeague: id
    });
    return user;
}

module.exports = {getAll, getByID};
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

async function createLeague(leagueName, maxNumberOfCoaches, format, megaTiers, sTiers, aTiers, bTiers, cTiers, dTiers) {
    const knex = await connectDatabase();
    let league = knex('league').insert({name: leagueName, maxNumberOfCoaches: maxNumberOfCoaches, format: format, megaTiers: megaTiers, sTiers: sTiers, aTiers: aTiers, bTiers: bTiers, cTiers: cTiers, dTiers: dTiers});
    return league;
}

module.exports = {getAll, getByID, createLeague};
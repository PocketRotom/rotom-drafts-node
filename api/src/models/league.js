const { connectDatabase } = require('../utils/database');

async function getAll() {

    const knex = await connectDatabase();

    let subquery = knex.select("idLeague").count("* as playersCount").from("team").groupBy("idLeague");


    let leagues = knex.select("league.*", "s.playersCount").from("league").leftJoin({ s: subquery }, "league.idLeague", "s.idLeague");
    
    return leagues;
}

async function getByID(id) {
    const knex = await connectDatabase();
    let league = knex.select("*").from('league').where({
        idLeague: id
    });
    return league;
}

async function createLeague(leagueName, maxNumberOfCoaches, format, megaTiers, sTiers, aTiers, bTiers, cTiers, dTiers, userID) {
    const knex = await connectDatabase();
    let league = await knex('league').insert({name: leagueName, maxNumberOfCoaches: maxNumberOfCoaches, format: format, megaTiers: megaTiers, sTiers: sTiers, aTiers: aTiers, bTiers: bTiers, cTiers: cTiers, dTiers: dTiers});
    addAdmin(league, userID);
    return league;
}

async function addAdmin(leagueID, userID) {
    const knex = await connectDatabase();

    let league = getByID(leagueID);

    if (!league) {
        throw "League doesn't exist";
    }

    let admin = knex('leagueadmins').insert({
        idLeague: leagueID,
        idUser: userID
    })

    return admin;
}

async function getAdmins(leagueID) {
    const knex = await connectDatabase();

    let admins = knex("leagueadmins").select("*").where({
        idLeague: leagueID
    });
    
    return admins;
}



module.exports = {getAll, getByID, createLeague, addAdmin, getAdmins};
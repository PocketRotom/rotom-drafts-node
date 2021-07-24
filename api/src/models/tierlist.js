const { connectDatabase } = require('../utils/database');

async function getTierlist(leagueID) {

    const knex = await connectDatabase();

    let tierlist = await knex.raw(`SELECT * FROM (SELECT p.*, t.idLeague, t.tier FROM drafts.pokemon AS p LEFT JOIN drafts.tierlist AS t ON p.idPokemon = t.idPokemon) AS r WHERE r.idLeague = ${leagueID} OR r.idLeague IS NULL;`);
    tierlist = tierlist[0];
    tierlist.forEach(pokemon => {
        if (pokemon.tier === null) {
            pokemon.tier = "D";
        }
    });
    return tierlist;

}


module.exports = { getTierlist };
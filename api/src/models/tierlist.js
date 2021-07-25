const { connectDatabase } = require('../utils/database');

async function getTierlist(leagueID) {

    const knex = await connectDatabase();

    let tierlist = await knex.raw(`SELECT * FROM (SELECT p.*, t.idLeague, t.tier FROM drafts.pokemon AS p LEFT JOIN drafts.tierlist AS t ON p.idPokemon = t.idPokemon) AS r;`);
    tierlist = tierlist[0];

    let pokemonToRemove = [];
    for (let i = 0; i < tierlist.length; i++) {
        if (i + 1 != tierlist.length) {
            if (tierlist[i].idPokemon == tierlist[i + 1].idPokemon) {
                if (tierlist[i + 1] == leagueID) {
                    pokemonToRemove.push(tierlist[i]);
                } else {
                    pokemonToRemove.push(tierlist[i+1]);
                }
            }
        }
    }

    pokemonToRemove.forEach(pokemon => {
        var index = tierlist.indexOf(pokemon);
        if (index !== -1) {
            tierlist.splice(index, 1);
        }
    });

    tierlist.forEach(pokemon => {
        if (pokemon.tier === null || pokemon.idLeague != leagueID) {
            pokemon.tier = "D";
        }
    });

    return tierlist;

}


module.exports = { getTierlist };
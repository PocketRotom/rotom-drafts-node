const { connectDatabase } = require("../utils/database");

async function getPokemons() {
	const knex = await connectDatabase();

	let teams = await knex("pokemon").select("*");

	knex.destroy();

	return teams;
}

async function getPokemonByTier(tier) {
	const knex = await connectDatabase();

	let teams = await knex("pokemon").select("*").where({
		tier: tier,
	});

	knex.destroy();

	return teams;
}

async function draft(teamID, pokemonID, draftNo, tier) {
	const knex = await connectDatabase();

	//console.log(teamID, pokemonID, draftNo, tier);

	let points = await knex("team").select("points").where({
		idTeam: teamID,
	});

	let newPoints = points[0].points - tier;

	let pokemon = await knex("teamdraft").insert({
		idTeam: teamID,
		idPokemon: pokemonID,
		draftNo: draftNo,
		tier: tier,
	});

	console.log(pokemon);

	let updatePoints = await knex("team").update({ points: newPoints }).where({
		idTeam: teamID,
	});

	knex.destroy();

	return { pokemon: pokemon, points: newPoints };
}

async function draftByTier(teamID, pokemonID, draftNo, tier) {
	const knex = await connectDatabase();

	let pokemon = await knex("teamdraft").insert({
		idTeam: teamID,
		idPokemon: pokemonID,
		draftNo: draftNo,
		tier: tier,
	});

	knex.destroy();

	return { pokemon: pokemon };
}

async function ban(pokemonID, teamID) {
	const knex = await connectDatabase();

	let pokemon = await knex("pokemon").where({ idPokemon: pokemonID }).update({
		tier: "BAN",
	});

	let team = await knex("team").where({ idTeam: teamID }).update({
		ban: pokemonID,
	});

	knex.destroy();

	return { pokemon, team };
}

async function setTier(pokemonID, tier) {
	const knex = await connectDatabase();

	let pokemon = await knex("pokemon").where({ idPokemon: pokemonID }).update({
		tier: tier,
	});

	knex.destroy();

	return pokemon;
}

async function isFree(pokemonID, draftNo) {
	const knex = await connectDatabase();

	let pokemons = await knex("pokemon").select("tier").where({
		idPokemon: pokemonID,
	});
	if (pokemons[0].tier == "ban") {
		return { status: "Banned", tier: pokemons[0].tier };
	}

	let draft = await knex("teamdraft").select("*").where({
		idPokemon: pokemonID,
	});
	knex.destroy();

	let isDraft = false;
	let i = 0;
	while (isDraft == false && i < draft.length) {
		if (draft[i].draftNo == draftNo) {
			isDraft = true;
		}
		i++;
	}
	if (isDraft) {
		return {
			status: "Picked",
			tier: pokemons[0].tier,
			draftNo: draft[i - 1].draftNo,
			idTeam: draft[i - 1].idTeam,
		};
	}

	return { status: "Not Picked", tier: pokemons[0].tier };
}

async function getPokemon(pokemonID) {
	const knex = await connectDatabase();

	let pokemons = await knex("pokemon").select("*").where({
		idPokemon: pokemonID,
	});

	knex.destroy();

	return pokemons;
}

async function addPokemon(name, type1, type2, hp, attack, defense, spAttack, spDefense, speed, tier) {
	const knex = await connectDatabase();

	let pokemon;

	if (type2 == "null" || type2 == "") {
		pokemon = await knex("pokemon").insert({
			name,
			type1,
			type2: null,
			hp,
			attack,
			defense,
			spAttack,
			spDefense,
			speed,
			tier
		});
	} else {
		pokemon = await knex("pokemon").insert({
			name,
			type1,
			type2,
			hp,
			attack,
			defense,
			spAttack,
			spDefense,
			speed,
			tier
		});
	}

	knex.destroy();

	return { pokemon: pokemon };
}

module.exports = {
	getPokemons,
	getPokemonByTier,
	draft,
	ban,
	draftByTier,
	isFree,
	setTier,
	getPokemon,
	addPokemon
};

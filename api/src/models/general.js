const { connectDatabase } = require("../utils/database");

async function getCurrentPick(draftNo){
  const knex = await connectDatabase();

  let currentPick = await knex("general")
  .select("currentPick").where({
    draftNo: draftNo
  });

  knex.destroy();

  return currentPick;
}

async function setCurrentPick(currentPick, draftNo){
  const knex = await connectDatabase();

  console.log(currentPick);

  let conecction = await knex("general")
  .where({draftNo: draftNo}).update({
    currentPick: currentPick
  });

  knex.destroy();
  return conecction;
}

module.exports = {
	getCurrentPick,
  setCurrentPick
};

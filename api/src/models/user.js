const { connectDatabase } = require('../utils/database');

async function getAll() {
    const knex = await connectDatabase();
    let users = knex.select("userID", "username").from('users');
    return users;
}

async function getByID(id) {
    const knex = await connectDatabase();
    let user = knex.select("*").from('users').where({
        userID: id
    });
    return user;
}

async function getByUsername(username) {
    const knex = await connectDatabase();
    let user = knex.select("*").from('users').where({
        username: username
    });
    return user;
}



module.exports = {getAll, getByID, getByUsername};
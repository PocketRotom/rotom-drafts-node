const { connectDatabase } = require('../utils/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(username, password, email, discord) {

    const knex = await connectDatabase();

    let users = await knex.select("username").from('users');

    users.forEach(user => {
        if (user.username == username) {
            throw "Username already exists";
        }
    }); 

    let emails = await knex.select("email").from('users');

    emails.forEach(user => {
        if (user.email == email) {
            throw "Email already exists";
        }
    }); 

    if (password.length < 4) {
        throw "Password is too small";
    }
    
    let passCrypt = await bcrypt.hash(password, 10);

    let user = knex("users").insert({username: username, email: email, password: passCrypt, discordTag: discord});

    return user;
}

async function login(username, password) {

    const knex = await connectDatabase();

    let users = await knex.select("*").from('users');

    let userFinal;

    users.forEach(user => {
        if (user.username == username) {
            userFinal = user;
        }
    });
    if (userFinal == undefined) {
        throw "Username is wrong";
    }

    if (!(await bcrypt.compare(password, userFinal.password))){
        throw "Wrong password";
    }

    delete userFinal.password;
    delete userFinal.email;

    let token = jwt.sign({
        data: userFinal
      }, 'secret', { expiresIn: 60*60*24 });
       

    return token;
}



module.exports = { signup, login };
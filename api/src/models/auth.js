const { connectDatabase } = require('../utils/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

async function signup(username, password, email, discord) {

    const knex = await connectDatabase();

    let users = await knex.select("username").from('users');

    let usernameFinal;

    users.forEach(user => {
        if (user.username == username) {
            usernameFinal = user.username;
        }
    });

    if (usernameFinal != undefined) {
        return "Username already exists";
    }

    let emails = await knex.select("email").from('users');

    let emailFinal;

    emails.forEach(user => {
        if (user.email == email) {
            emailFinal = user.email;
        }
    });
    if (emailFinal != undefined) {
        return "Email already exists";
    }

    if (password.length < 4) {
        return "Password is too small";
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
        return "Username is wrong";
    }

    if (!(await bcrypt.compare(password, userFinal.password))){
        return "Wrong password";
    }

    delete userFinal.password;
    delete userFinal.email;

    let token = jwt.sign({
        data: userFinal
      }, process.env.SECRET, { expiresIn: 60*60*24 });
       

    return token;
}

async function verify(token) {

    let data = jwt.verify(token, process.env.SECRET );

    return data;
}



module.exports = { signup, login, verify };
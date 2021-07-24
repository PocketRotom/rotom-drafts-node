const Auth = require("../models/auth.js");

module.exports = {
    signup: async (req, res) => {
        try {  
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let discord = req.body.discord;
            let auth = await Auth.signup(username, password, email, discord);
            return res.status(200).json({
                success: true,
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err
            })
        }
    },
    login: async (req, res) => {
        try {
            let username = req.body.username;
            let password = req.body.password;

            let auth = await Auth.login(username, password);
            return res.status(200).json({
                success: true,
                data: auth
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err
            })
        }
    },
}
const Auth = require("../models/auth.js");

module.exports = {
    signup: async (req, res) => {
        try {  
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let discord = req.body.discord;
            let auth = await Auth.signup(username, password, email, discord);
            if (auth == "Username already exists" || auth == "Email already exists" || auth == "Password is too small") {
                return res.status(200).json({
                    success: false,
                    error: auth
                });
            }
            return res.status(200).json({
                success: true
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
            console.log(req.body);
            let username = req.body.username;
            let password = req.body.password;

            let auth = await Auth.login(username, password);
            if (auth == "Username is wrong" || auth == "Wrong password") {
                return res.status(200).json({
                    success: false,
                    error: auth
                });
            }
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
    verify: async (req, res) => {
        try {
            let token = req.body.token;

            let data = await Auth.verify(token);
            return res.status(200).json({
                success: true,
                data: data
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err
            })
        }
    },
}
const User = require("../models/user.js");

module.exports = {
    findAll: async (req, res) => {
        try {
            let users = await User.getAll();
            return res.status(200).json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    findUserByID: async (req, res) => {
        try {
            let user = await User.getByID(req.params.userID);
            return res.status(200).json({
                success: true,
                count: user.length,
                data: user
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    findUserByUsername: async (req, res) => {
        try {
            let user = await User.getByUsername(req.params.username);
            return res.status(200).json({
                success: true,
                count: user.length,
                data: user
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
}


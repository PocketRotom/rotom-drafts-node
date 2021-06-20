const League = require("../models/league.js");

module.exports = {
    findAll: async (req, res) => {
        try {
            let leagues = await League.getAll();
            return res.status(200).json({
                success: true,
                count: leagues.length,
                data: leagues
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
    findUserByID: async (req, res) => {
        try {
            let league = await League.getByID(req.params.leagueID);
            return res.status(200).json({
                success: true,
                count: league.length,
                data: league
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server Error!"
            })
        }
    },
}